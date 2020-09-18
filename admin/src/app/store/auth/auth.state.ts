import { AuthSuccessResponse } from './auth.interface';

export enum AuthState {
    Unchecking = 3,
    Checking = 0,
    Authorized = 1,
    Unauthorized = 2
}

export interface State {
    isAuthorized?: AuthState;
    user?: any;
    auth?: {
        isLoading: boolean,
        isSuccess: boolean,
        error: any,
        data: any
    };
    signin?: {
        isLoading: boolean,
        isSuccess: boolean,
        error: any,
        data: any
    };
    signout?: {
        isLoading: boolean,
        isSuccess: boolean,
        error: any,
        data: any
    };
    permissions?: string[];
}

export const initialState: State = {
    isAuthorized: AuthState.Unchecking,
    permissions: [],
    auth: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    },
    signin: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    },
    signout: {
        isLoading: false,
        isSuccess: false,
        error: null,
        data: null
    }
};
