export interface OAuthProviderMethod {
    name: string,
    method: string,
    orderNo: number,
    authority?: string,
    responseType?: string,
    scope?: string,
    isSupported?: boolean
}

export const OAuthProviderMethods: OAuthProviderMethod[] = [
    {
        name: 'Password with Username/Email',
        method: 'password',
        orderNo: 0,
        isSupported: true
    },
    {
        name: 'Passwordless',
        method: 'passwordless',
        orderNo: 1,
        isSupported: true
    },
    {
        name: 'Google',
        method: 'google',
        orderNo: 2,
        authority: 'https://accounts.google.com',
        responseType: 'id_token',
        scope: 'openid email profile',
        isSupported: true
    },
    {
        name: 'Facebook',
        method: 'facebook',
        orderNo: 3,
        isSupported: false
    },
    {
        name: 'Line',
        method: 'line',
        orderNo: 4,
        authority: 'https://access.line.me',
        responseType: 'code',
        scope: 'openid email profile',
        isSupported: true
    },
    {
        name: 'Apple',
        method: 'apple',
        orderNo: 5,
        isSupported: false
    },
    {
        name: 'Microsoft',
        method: 'microsoft',
        orderNo: 6,
        isSupported: false
    }
]