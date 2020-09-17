import * as dotenv from 'dotenv'
import { Configuration } from 'oidc-provider'
dotenv.config()

export const AuthProviderConfig: Configuration = {
    formats: {
        AccessToken: 'jwt',
    },
    clients: [{
        client_id: 'foo',
        client_secret: 'bar',
        redirect_uris: ['http://localhost:3000/auth'],
        response_types: ['code']
    }],
    cookies: {
        long: {
            sameSite: 'none'
        },
        short: {
            sameSite: 'none'
        },
        keys: ["test"]
    },
    interactions: {
        url(ctx) {
            return `/auth/${ctx.oidc.uid}`;
        },
    },
    features: {
        devInteractions: { enabled: false },
        introspection: { enabled: true },
        revocation: { enabled: true },
    },
}