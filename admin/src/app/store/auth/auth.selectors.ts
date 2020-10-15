import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { State, AuthState } from './auth.state';

export const getIsAuthorized = (state: State): AuthState => state.isAuthorized;
export const getPermissions = (state: State): string[] => state.permissions;

export const selectAuthState: MemoizedSelector<object, State> = createFeatureSelector<State>('auth');

export const selectIsAuthorized: MemoizedSelector<object, AuthState> = createSelector(selectAuthState, getIsAuthorized);
export const selectPermissions: MemoizedSelector<object, string[]> = createSelector(selectAuthState, getPermissions);