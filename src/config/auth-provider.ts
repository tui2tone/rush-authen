import * as dotenv from 'dotenv'
import { Configuration } from 'oidc-provider'
dotenv.config()


async function logoutSource(ctx, form) {
    ctx.body = `<!DOCTYPE html>
    <head>
      <title>Logout Request</title>
      <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
    </head>
    <body>
      <div style="visibility: hidden">
        <h1>Do you want to sign-out from ${ctx.host}?</h1>
        ${form}
        <button autofocus type="submit" id="btn-submit" form="op.logoutForm" value="yes" name="logout">Yes, sign me out</button>
<button type="submit" form="op.logoutForm">No, stay signed in</button>
      </div>
      <script>
             const btn = document.getElementById('btn-submit');
 btn.style.display = "inline";
 btn.click()
     </script>
    </body>
    </html>`;
}

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
    claims: {
        acr: null,
        auth_time: null,
        iss: null,
        openid: [
            'sub'
        ],
        sid: null,
        profile: [
            'firstName',
            'fullName',
            'lastName',
            'profileImgUrl'
        ]
    },
    features: {
        devInteractions: { enabled: false },
        introspection: { enabled: true },
        jwtIntrospection: {
            enabled: true
        },
        revocation: { enabled: true },
        clientCredentials: { enabled: true },
        rpInitiatedLogout: {
            enabled: true,
            logoutSource
        }
    }
}