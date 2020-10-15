export enum AuthState {
    Empty = 3,
    Loading = 0,
    Authorized = 1,
    Unauthorized = 2
}

export interface State {
    isAuthorized?: AuthState;
    permissions?: string[];
}

export const initialState: State = {
    isAuthorized: AuthState.Empty,
    permissions: []
};
