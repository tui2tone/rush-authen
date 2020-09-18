import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { State, AuthState } from './auth.state';

export const getError = (state: State): string => state.auth.error;
export const getIsLoading = (state: State): boolean => state.auth.isLoading;
export const getIsAuthorized = (state: State): AuthState => state.isAuthorized;
export const getPermissions = (state: State): string[] => state.permissions;

export const getSigninError = (state: State): string => state.signin.error;
export const getSigninIsLoading = (state: State): boolean => state.signin.isLoading;
export const getSigninIsSuccess = (state: State): boolean => state.signin.isSuccess;

export const getSignoutError = (state: State): string => state.signout.error;
export const getSignoutIsLoading = (state: State): boolean => state.signout.isLoading;
export const getSignoutIsSuccess = (state: State): boolean => state.signout.isSuccess;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>('auth');

export const selectError: MemoizedSelector<object, string> = createSelector(selectAuthState, getError);
export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getIsLoading);
export const selectIsAuthorized: MemoizedSelector<object, AuthState> = createSelector(selectAuthState, getIsAuthorized);
export const selectPermissions: MemoizedSelector<object, string[]> = createSelector(selectAuthState, getPermissions);

export const selectSigninError: MemoizedSelector<object, string> = createSelector(selectAuthState, getSigninError);
export const selectSigninIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getSigninIsLoading);
export const selectSigninIsSuccess: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getSigninIsSuccess);

export const selectSignoutError: MemoizedSelector<object, string> = createSelector(selectAuthState, getSignoutError);
export const selectSignoutIsLoading: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getSignoutIsLoading);
export const selectSignoutIsSuccess: MemoizedSelector<object, boolean> = createSelector(selectAuthState, getSignoutIsSuccess);