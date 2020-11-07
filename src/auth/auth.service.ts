import { Injectable, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Hash } from '@utils/hash';
import { User } from '@users/schemas/user.entity';
import { UsersService } from '@users/users.service';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './schemas/session.entity';
import { UserPasswordSigninDto } from './interfaces/auth-payload.interface';
import { Config } from '@config/index';
import { AuthProvider } from '@utils/auth-provider';
import { Request, Response } from 'express';
import { InteractionResults } from 'oidc-provider';
import { Issuer } from 'openid-client';
import { SettingService } from '@setting/setting.service';
import { ClientsService } from '@clients/clients.service';
import { ProjectsService } from '@projects/projects.service';

@Injectable()
export class AuthService extends TypeOrmCrudService<Session> {
    constructor(
        @InjectRepository(Session)
        public repo: Repository<Session>,
        private user: UsersService,
        private setting: SettingService,
        private project: ProjectsService,
        private client: ClientsService
    ) {
        super(repo)
    }


    async getSigninSession(req: Request, res: Response): Promise<InteractionResults> {
        const response = await AuthProvider.interactionDetails(req, res);
        return Promise.resolve(null)
    }

    async signinPassword(req: Request, res: Response, dto: UserPasswordSigninDto) {

        try {
            const { uid, prompt, params } = await AuthProvider.interactionDetails(req, res);
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

                return await AuthProvider.interactionFinished(req, res, result);
            } else {
                return res.render('login',
                    {
                        uid,
                        error: 'Invalid username / password'
                    },
                );
            }
        } catch (error) {
            console.error(error)
        }
    }

    async validateToken(token: string): Promise<any> {
        try {
            const tokens = await this.repo.query(`select * from "AccessTokens" where data->>'kind' = 'AccessToken' AND data->>'jwt' = '${token}';`)
            if (tokens && tokens.length) {
                const exist = tokens[0]
                const client = await this.client.repo.findOne({
                    clientId: exist.data.clientId
                })
                const site = await this.setting.get()
                const issuer = await Issuer.discover(site.siteUrl + '/oauth')
                const clienIssuer = new issuer.Client({
                    client_id: client.clientId,
                    client_secret: client.clientSecret,
                    introspection_endpoint_auth_method: client.tokenEndpointAuthMethod as any,
                    redirect_uris: [],
                    response_types: [],
                    grant_types: ['client_credentials']
                });
                return await clienIssuer.introspect(token)
            } else {
                
            }
        } catch (error) {
            console.error(error)
            throw new UnauthorizedException();
        }
    }

    async getActiveToken(token: string) {
        return await this.repo.findOne({ token })
    }

    async revokeToken(token: string) {
        return await this.repo.delete({ token })
    }

    async generateToken(user: User) {
        const token = Hash.generateToken(user)
        const session = await this.repo.save({
            token
        })
        return session
    }
}
