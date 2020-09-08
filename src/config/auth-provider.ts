import * as dotenv from 'dotenv'
import { Configuration } from 'oidc-provider'
dotenv.config()

export const AuthProviderConfig: Configuration = {
    formats: {
        AccessToken: 'jwt',
    }
}