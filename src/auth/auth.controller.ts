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
import { GoogleProfilePayload } from './interfaces/google-payload.interface';
import { nanoid } from 'nanoid';
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

            const provider = await this.provider.findOne({
                method
            })

            const issuer = await Issuer.discover(provider.authority)
            const client = new issuer.Client({
                authority: provider.authority,
                client_id: provider.clientId,
                client_secret: provider.clientSecret,
                redirect_uris: [provider.redirectUri],
                response_types: [provider.responseType],
                scope: provider.scope
            });
            const callbackParams = client.callbackParams(req);
            const tokenSet = await client.callback(provider.redirectUri, callbackParams, {
                nonce
            })
            const profile = tokenSet.claims() as GoogleProfilePayload
            console.log(profile)

            // Create Profile If Not Exist
            let existProfile = await this.user.repo.findOne({
                googleUserId: profile.sub
            })

            if (!existProfile) {
                existProfile = await this.user.repo.save({
                    uuid: nanoid(),
                    googleUserId: profile.sub,
                    email: profile.email,
                    username: profile.email,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    profileImgUrl: profile.picture
                })
            }

            const result = {
                login: {
                    account: profile.email,
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
            redirect_uris: [provider.redirectUri],
            response_types: [provider.responseType]
        });
        const cookieKeys = Object.keys(req.cookies)
        cookieKeys.map((key) => {
            res.cookie(key, req.cookies[key])
        })
        const nonce = generators.nonce();
        res.cookie('uid', uid + "|||" + provider.method);
        res.cookie('nonce', nonce);
        const url = client.authorizationUrl({
            scope: provider.scope,
            response_mode: 'form_post',
            nonce
        });
        return res.redirect(url)
    }
}
