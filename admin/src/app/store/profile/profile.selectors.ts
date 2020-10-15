import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './profile.state';
import { Profile } from './profile.interface';

export const getFindError = (state: State): string => state.find.error;
export const getFindIsLoading = (state: State): boolean => state.find.isLoading;
export const getFindProfiles = (state: State): Profile => state.find.data;

export const getUpdateError = (state: State): Profile => state.update.error;
export const getUpdateIsLoading = (state: State): boolean => state.update.isLoading;
export const getUpdateProfiles = (state: State): Profile => state.update.data;

export const getGetResetPasswordError = (state: State): string => state.resetPassword.error;
export const getGetResetPasswordIsLoading = (state: State): boolean => state.resetPassword.isLoading;
export const getGetResetPasswordIsSuccess = (state: State): boolean => state.resetPassword.isSuccess;

export const selectProfileState: MemoizedSelector<object, State> = createFeatureSelector<State>('profile');

export const selectFindError: MemoizedSelector<object, string> = createSelector(selectProfileState, getFindError);
export const selectFindIsLoading: MemoizedSelector<object, boolean> = createSelector(selectProfileState, getFindIsLoading);
export const selectFindProfiles: MemoizedSelector<object, Profile> = createSelector(selectProfileState, getFindProfiles);

export const selectUpdateError: MemoizedSelector<object, Profile> = createSelector(selectProfileState, getUpdateError);
export const selectUpdateIsLoading: MemoizedSelector<object, boolean> = createSelector(selectProfileState, getUpdateIsLoading);
export const selectUpdateProfiles: MemoizedSelector<object, Profile> = createSelector(selectProfileState, getUpdateProfiles);

export const selectGetResetPasswordError: MemoizedSelector<object, string> = createSelector(selectProfileState, getGetResetPasswordError);
export const selectGetResetPasswordIsLoading: MemoizedSelector<object, boolean> = createSelector(selectProfileState, getGetResetPasswordIsLoading);
export const selectGetResetPasswordIsSuccess: MemoizedSelector<object, boolean> = createSelector(selectProfileState, getGetResetPasswordIsSuccess);
