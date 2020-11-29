import { Injectable, CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Hash } from '@utils/hash';
import { User } from '@users/schemas/user.entity';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './schemas/session.entity';
import { Issuer } from 'openid-client';
import { SettingService } from '@setting/setting.service';
import { ClientsService } from '@clients/clients.service';

@Injectable()
export class AuthService extends TypeOrmCrudService<Session> {
    constructor(
        @InjectRepository(Session)
        public repo: Repository<Session>,
        private setting: SettingService,
        private client: ClientsService
    ) {
        super(repo)
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
