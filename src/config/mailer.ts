import * as dotenv from 'dotenv'
dotenv.config()

export const MailerConfig = {
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_CLIENT_ID: process.env.SMTP_CLIENT_ID,
    SMTP_CLIENT_SECRET: process.env.SMTP_CLIENT_SECRET,
    SMTP_REFRESH_TOKEN: process.env.SMTP_REFRESH_TOKEN
}