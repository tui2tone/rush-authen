import * as dotenv from 'dotenv'
dotenv.config()

export const GoogleOAuthConfig = {
    CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL
}