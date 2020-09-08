import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}

export const RedisConfig = {
    HOST: process.env.REDIS_HOST || '127.0.0.1',
    PORT: process.env.REDIS_PORT || '6379'
}