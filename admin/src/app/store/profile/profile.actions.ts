import { Action } from '@ngrx/store';
import { Profile } from './profile.interface';

export enum ProfileActionTypes {
    LOAD_REQUEST = '[Profile] Load Request',
    LOAD_FAILURE = '[Profile] Load Failure',
    LOAD_SUCCESS = '[Profile] Load Success',
    UPDATE_REQUEST = '[Profile] Update Request',
    UPDATE_FAILURE = '[Profile] Update Failure',
    UPDATE_SUCCESS = '[Profile] Update Success',
    RESET_PASSWORD_REQUEST = "[Profile] Reset Password Request",
    RESET_PASSWORD_FAILURE = "[Profile] Reset Password Failure",
    RESET_PASSWORD_SUCCESS = "[Profile] Reset Password Success",
}

export class LoadRequestAction implements Action {
    readonly type = ProfileActionTypes.LOAD_REQUEST;
    constructor() { }
}

export class LoadFailureAction implements Action {
    readonly type = ProfileActionTypes.LOAD_FAILURE;
    constructor(public error: string) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ProfileActionTypes.LOAD_SUCCESS;
    constructor(public profile: Profile) { }
}

export class UpdateRequestAction implements Action {
    readonly type = ProfileActionTypes.UPDATE_REQUEST;
    constructor(public profile: Profile) { }
}

export class UpdateFailureAction implements Action {
    readonly type = ProfileActionTypes.UPDATE_FAILURE;
    constructor(public error: Profile) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ProfileActionTypes.UPDATE_SUCCESS;
    constructor(public profile: Profile) { }
}

export class ResetPasswordRequestAction implements Action {
    readonly type = ProfileActionTypes.RESET_PASSWORD_REQUEST;
    constructor(public payload: any) { }
}

export class ResetPasswordFailureAction implements Action {
    readonly type = ProfileActionTypes.RESET_PASSWORD_FAILURE;
    constructor(public payload: string) { }
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = ProfileActionTypes.RESET_PASSWORD_SUCCESS;
    constructor(public payload: any) { }
}

export type ProfileActions =
    | LoadRequestAction
    | LoadFailureAction
    | LoadSuccessAction
    | UpdateRequestAction
    | UpdateFailureAction
    | UpdateSuccessAction
    | ResetPasswordRequestAction
    | ResetPasswordFailureAction
    | ResetPasswordSuccessAction;
