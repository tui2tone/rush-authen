import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
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

@Injectable()
export class AuthService extends TypeOrmCrudService<Session> {
    constructor(
        @InjectRepository(Session)
        public repo: Repository<Session>,
        private user: UsersService
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
                        account: matched.email,
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
                        message: 'Hello world!'
                    },
                );
            }
        } catch (error) {
            console.error(error)
        }
    }

    async validateToken(token: string): Promise<any> {
        return await this.getActiveToken(token)
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
