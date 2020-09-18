import { Action } from '@ngrx/store';
import { AuthPayload, AuthSuccessResponse } from './auth.interface';

export enum AuthActionTypes {
    LOAD_REQUEST = '[Auth] Load Request',
    LOAD_FAILURE = '[Auth] Load Failure',
    LOAD_SUCCESS = '[Auth] Load Success',
    SIGNIN_REQUEST = "[Auth] Signin Request",
    SIGNIN_FAILURE = "[Auth] Signin Failure",
    SIGNIN_SUCCESS = "[Auth] Signin Success",
    SIGNOUT_REQUEST = '[Signout] Load Request',
    SIGNOUT_FAILURE = '[Signout] Load Failure',
    SIGNOUT_SUCCESS = '[Signout] Load Success'
}

export class LoadRequestAction implements Action {
    readonly type = AuthActionTypes.LOAD_REQUEST;
    constructor() { }
}

export class LoadFailureAction implements Action {
    readonly type = AuthActionTypes.LOAD_FAILURE;
    constructor(public error: string) { }
}

export class LoadSuccessAction implements Action {
    readonly type = AuthActionTypes.LOAD_SUCCESS;
    constructor(public payload: AuthSuccessResponse) { }
}

export class SigninRequestAction implements Action {
    readonly type = AuthActionTypes.SIGNIN_REQUEST;
    constructor(public payload: AuthPayload) { }
}

export class SigninFailureAction implements Action {
    readonly type = AuthActionTypes.SIGNIN_FAILURE;
    constructor(public payload: string) { }
}

export class SigninSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGNIN_SUCCESS;
    constructor(public payload: AuthSuccessResponse) { }
}


export class SignoutRequestAction implements Action {
    readonly type = AuthActionTypes.SIGNOUT_REQUEST;
    constructor() { }
}

export class SignoutFailureAction implements Action {
    readonly type = AuthActionTypes.SIGNOUT_FAILURE;
    constructor(public error: string) { }
}

export class SignoutSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGNOUT_SUCCESS;
    constructor() { }
}

export type AuthActions =
    | LoadRequestAction
    | LoadFailureAction
    | LoadSuccessAction
    | SigninRequestAction
    | SigninFailureAction
    | SigninSuccessAction
    | SignoutRequestAction
    | SignoutFailureAction
    | SignoutSuccessAction;
