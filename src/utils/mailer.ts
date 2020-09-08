import * as nodemailer from 'nodemailer';
import { MailerConfig } from '@config/mailer';

export const getMailerClient = () => {
    if (MailerConfig.SMTP_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: MailerConfig.SMTP_SERVICE,
            auth: {
                type: 'oauth2',
                user: MailerConfig.SMTP_USER,
                clientId: MailerConfig.SMTP_CLIENT_ID,
                clientSecret: MailerConfig.SMTP_CLIENT_SECRET,
                refreshToken: MailerConfig.SMTP_REFRESH_TOKEN
            }
        })
    } else {
        return nodemailer.createTransport({
            host: MailerConfig.SMTP_SERVICE,
            port: 25,
            secure: false
        })
    }
}

const transporter = getMailerClient();

export const sendMail = async (email: string, subject: string, message: string, attachments: any = []) => {
    return await transporter.sendMail({
        from: `"support@rushlap.com" <${MailerConfig.SUPPORT_EMAIL}>`,
        to: email,
        subject: subject,
        html: message,
        attachments
    })
}