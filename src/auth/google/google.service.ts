import { Injectable } from '@nestjs/common';
import { GoogleAuthPayload } from '@auth/interfaces/auth-payload.interface';
import axios from 'axios';
import { OAuthProvidersService } from '@oauth-providers/oauth-providers.service';
import { Request, Response } from 'express';
import { AuthProvider } from '@utils/auth-provider';
const { Issuer } = require('openid-client');

@Injectable()
export class GoogleService {

    constructor(
        private provider: OAuthProvidersService
    ) {

    }

    async authen(req: Request, res: Response, payload: GoogleAuthPayload) {
        try {
            const provider = await this.provider.findOne({
                method: 'google'
            })

            const issuer = await Issuer.discover(provider.issuer)
            const client = new issuer.Client({
                authority: provider.authority,
                client_id: provider.clientId,
                client_secret: provider.clientSecret,
                redirect_uris: [provider.redirectUri],
                response_types: [provider.responseType],
                scope: provider.scope
            });
            const params = client.callbackParams(req);
            console.log(payload)
            // const profile = await client.userinfo(payload.id_token)
            const response = await client.callback(provider.redirectUri, params, {
                state: params.state
                // nonce: params.nonce
            })
            console.log(response)

            // Create Profile & Redirect Back

            // const result = {
            //     login: {
            //         account: profile.email || profile.username,
            //     },
            //     consent: {
            //         rejectedScopes: [],
            //         rejectedClaims: [],
            //     },
            // }

            // const session = await AuthProvider.interactionFinished(req, res, result);
            // return res.send(session);
            return res.send(null);
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }
}
