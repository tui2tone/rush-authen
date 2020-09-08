import { Injectable } from '@nestjs/common';
import { GoogleAuthPayload } from '@auth/interfaces/auth-payload.interface';
import { GoogleOAuthConfig } from '@config/google.oauth';
import { google } from 'googleapis';
import axios from 'axios';

const oauth2Client = new google.auth.OAuth2(
    GoogleOAuthConfig.CLIENT_ID,
    GoogleOAuthConfig.CLIENT_SECRET,
    GoogleOAuthConfig.REDIRECT_URL
);

@Injectable()
export class GoogleService {

    async authen(payload: GoogleAuthPayload) {
        // console.log(payload)
        // const { tokens } = await oauth2Client.
        // console.log(tokens)
        // oauth2Client.setCredentials(tokens);
        const result = await axios.post('https://oauth2.googleapis.com/token', {
            code: payload.code,
            client_id: GoogleOAuthConfig.CLIENT_ID,
            client_secret: GoogleOAuthConfig.CLIENT_SECRET,
            redirect_uri: GoogleOAuthConfig.REDIRECT_URL,
            grant_type: 'authorization_code'
        })
        console.log(result.data)
        return Promise.resolve()
    }
}
