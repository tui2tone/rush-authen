
export interface AuthPayload {
    username: string;
    password: string;
}

export interface AuthSuccessResponse {
    token: string;
    user: any,
    permissions: string[]
}