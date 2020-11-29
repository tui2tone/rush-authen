import { Controller, Body, Post, HttpStatus, HttpException, Delete, Get, Req, Res, Param, Query } from '@nestjs/common';
import { UserPasswordSigninDto, GoogleAuthPayload } from './interfaces/auth-payload.interface';
import { Public } from '@decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthProvider } from '@utils/auth-provider';
import * as queryString from 'query-string'
import { ClientsService } from '@clients/clients.service';
import { OAuthProvidersService } from '@oauth-providers/oauth-providers.service';
import { Hash } from '@utils/hash';
import { UsersService } from '@users/users.service';
import { Config } from '@config/index';
import { GoogleProfilePayload, LineProfilePayload } from './interfaces/provider-payload.interface';
import { nanoid } from 'nanoid';
import { User } from '@users/schemas/user.entity';
const { Issuer, generators } = require('openid-client');

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private user: UsersService,
        private client: ClientsService,
        private provider: OAuthProvidersService
    ) { }

    @Public()
    @Post('handler')
    async callbackHandler(
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            const [uid, method] = (req.cookies.uid || "|||").split("|||")
            const nonce = req.cookies.nonce
            const state = req.cookies.state

            const provider = await this.provider.findOne({
                method
            })

            if (!provider) {
                return {
                    code: 'no provider from cookie'
                }
            }

            const issuer = await Issuer.discover(provider.authority)
            const idTokenSignedResponseAlg = getIdTokenSignedResponseAlg(issuer, method)
            const client = new issuer.Client({
                authority: provider.authority,
                client_id: provider.clientId,
                client_secret: provider.clientSecret,
                redirect_uris: [provider.redirectUri],
                response_types: [provider.responseType],
                scope: provider.scope,
                id_token_signed_response_alg: idTokenSignedResponseAlg
            });
            const callbackParams = client.callbackParams(req);
            const tokenSet = await client.callback(provider.redirectUri, callbackParams, {
                nonce,
                state
            })
            let profile: User;

            if (provider.method === "google") {
                const googleProfile = tokenSet.claims() as GoogleProfilePayload

                // Create Profile If Not Exist
                profile = await this.user.repo.findOne({
                    googleUserId: googleProfile.sub
                })

                if (!profile) {
                    profile = await this.user.repo.save({
                        uuid: nanoid(),
                        googleUserId: googleProfile.sub,
                        email: googleProfile.email,
                        username: googleProfile.email,
                        firstName: googleProfile.given_name,
                        lastName: googleProfile.family_name,
                        profileImgUrl: googleProfile.picture
                    })
                }
            } else if (provider.method === "line") {
                const lineProfile = tokenSet.claims() as LineProfilePayload
                // Create Profile If Not Exist
                profile = await this.user.repo.findOne({
                    lineUserId: lineProfile.sub
                })

                if (!profile) {
                    profile = await this.user.repo.save({
                        uuid: nanoid(),
                        googleUserId: lineProfile.sub,
                        username: lineProfile.sub,
                        firstName: lineProfile.name,
                        profileImgUrl: lineProfile.picture
                    })
                }
            }

            const result = {
                login: {
                    account: profile.uuid,
                },
                consent: {
                    rejectedScopes: [],
                    rejectedClaims: [],
                },
            }

            const session = await AuthProvider.interactionFinished(req, res, result);
            return res.send(session);
        } catch (error) {
            console.error(error)
            return res.send(error)
        }
    }

    @Public()
    @Post(':uid/login')
    @ApiOperation({ summary: 'Signin via username/password' })
    @ApiResponse({ status: 200, description: 'Signin Successfully' })
    @ApiResponse({ status: 400, description: 'Something error' })
    async signinPassword(
        @Body() dto: UserPasswordSigninDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const { uid } = await AuthProvider.interactionDetails(req, res);
        try {
            dto.cryptedPassword = Hash.sha256(dto.password, Config.PASSWORD_SECRET)
            const matched = await this.user.repo.findOne({
                where: [{
                    username: dto.username,
                    cryptedPassword: dto.cryptedPassword,
                }, {
                    email: dto.username,
                    cryptedPassword: dto.cryptedPassword,
                }]
            })

            if (matched) {
                const result = {
                    login: {
                        account: matched.email || matched.username,
                    },
                    consent: {
                        rejectedScopes: [],
                        rejectedClaims: [],
                    },
                }

                const session = await AuthProvider.interactionFinished(req, res, result);
                return res.send(session);
            } else {
                return res.redirect(`/auth/${uid}?error=invalid`);
            }
        } catch (error) {
            return res.redirect(`/auth/${uid}?error=invalid`);
        }
    }

    @Public()
    @Get(':uid')
    async getSigninSession(
        @Req() req: Request,
        @Res() res: Response,
        @Param('uid') uid: string
    ) {
        const details = await AuthProvider.interactionDetails(req, res);
        const { prompt, params, session } = details;

        const client = await AuthProvider.Client.find(params.client_id);
        const appClient = await this.client.findOne({
            clientId: client.clientId
        }, {
            relations: ["project"]
        })

        if (prompt.name === 'login') {
            return res.render('index', {
                locals: {
                    uid,
                    project: appClient.name
                }
            });
        }
        if (prompt.name === "consent") {
            return res.render('index', {
                locals: {
                    uid,
                    project: appClient.name
                }
            });
        }

        if (prompt.name === "invalid_request") {

        }

        return res.redirect(`${params.redirect_uri}?${queryString.stringify({
            ...params
        })}`)
    }


    @Public()
    @Get(':uid/:method')
    async googleSignin(
        @Req() req: Request,
        @Res() res: Response,
        @Param('method') method: string,
        @Param('uid') uid: string
    ) {
        const provider = await this.provider.findOne({
            method
        })

        const issuer = await Issuer.discover(provider.authority)
        const client = new issuer.Client({
            client_id: provider.clientId,
            client_secret: provider.clientSecret,
            redirect_uris: [provider.redirectUri],
            response_types: [provider.responseType]
        });
        const cookieKeys = Object.keys(req.cookies)
        cookieKeys.map((key) => {
            res.cookie(key, req.cookies[key])
        })
        const nonce = generators.nonce();
        const state = generators.state()
        res.cookie('uid', uid + "|||" + provider.method);
        res.cookie('state', state);
        res.cookie('nonce', nonce);
        const url = client.authorizationUrl({
            scope: provider.scope,
            state,
            response_mode: 'form_post',
            nonce
        });
        return res.redirect(url)
    }
}

const getIdTokenSignedResponseAlg = (issuer, method: string) => {
    if (method === "line") {
        return 'HS256'
    }
    return issuer.id_token_signing_alg_values_supported[0]
}