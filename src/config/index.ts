import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || "postgres://admin:password@localhost:2345/authen-dev",
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    PASSWORD_SECRET: process.env.PASSWORD_SECRET,
    OAUTH_ISSUER: process.env.OAUTH_ISSUER || "http://localhost:3000"
}

export const RedisConfig = {
    HOST: process.env.REDIS_HOST || '127.0.0.1',
    PORT: process.env.REDIS_PORT || '6379'
}