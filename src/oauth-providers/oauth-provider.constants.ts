export interface OAuthProviderMethod {
    name: string,
    method: string,
    orderNo: number,
    authority?: string,
    responseType?: string,
    scope?: string
}

export const OAuthProviderMethods: OAuthProviderMethod[] = [
    {
        name: 'Email/Password',
        method: 'password',
        orderNo: 0
    },
    {
        name: 'Google',
        method: 'google',
        orderNo: 1,
        authority: 'https://accounts.google.com',
        responseType: 'id_token',
        scope: 'openid email profile'

    },
    {
        name: 'Facebook',
        method: 'facebook',
        orderNo: 2
    },
    {
        name: 'Line',
        method: 'line',
        orderNo: 3
    },
    {
        name: 'Apple',
        method: 'apple',
        orderNo: 4
    },
    {
        name: 'Microsoft',
        method: 'microsoft',
        orderNo: 5
    }
]