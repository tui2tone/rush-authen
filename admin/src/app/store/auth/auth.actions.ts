import { Action } from '@ngrx/store';
import { AuthSuccessResponse } from './auth.interface';

export enum AuthActionTypes {
    LOAD_REQUEST = '[Auth] Load Request',
    LOAD_FAILURE = '[Auth] Load Failure',
    LOAD_SUCCESS = '[Auth] Load Success'
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

export type AuthActions =
    | LoadRequestAction
    | LoadFailureAction
    | LoadSuccessAction;
