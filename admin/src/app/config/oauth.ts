export const OAuthConfig = {
    authority: 'http://localhost:3000/oauth',
    client_id: 'foo',
    redirect_uri: 'http://localhost:4200/auth/callback',
    response_type: 'code',
    scope: 'openid email',
    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 4,
    filterProtocolClaims: true,
    loadUserInfo: true
}