import * as dotenv from 'dotenv'
import { Configuration } from 'oidc-provider'
dotenv.config()

export const AuthProviderConfig: Configuration = {
    formats: {
        AccessToken: 'jwt'
    },
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
        clientCredentials: { enabled: true }
    }
}