import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, share, tap } from 'rxjs/operators';
import * as ProfileActions from './profile.actions';
import { ProfileActionTypes } from './profile.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Profile } from './profile.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Location } from '@angular/common';

const API_PATH = '/profile'

@Injectable()
export class Get {
    constructor(
        private actions: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<ProfileActions.LoadRequestAction>(
            ProfileActionTypes.LOAD_REQUEST
        ),
        switchMap(action => {
            return this.http
                .get(API_PATH)
                .pipe(
                    map((profile: Profile) => {
                        return new ProfileActions.LoadSuccessAction(profile);
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new ProfileActions.LoadFailureAction(response?.error?.error))
                    })
                )
        }),
        share()
    );
}

@Injectable()
export class Update {
    constructor(
        private actions: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<ProfileActions.UpdateRequestAction>(
            ProfileActionTypes.UPDATE_REQUEST
        ),
        switchMap(action =>
            this.http
                .put(API_PATH, action.profile)
                .pipe(
                    map((profile: Profile) => {
                        return new ProfileActions.UpdateSuccessAction(profile);
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new ProfileActions.UpdateFailureAction(response?.error?.error))
                    })
                )
        ),
        share()
    );
}

@Injectable()
export class ResetPassword {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private location: Location,
        private toastr: ToastrService,
        private translate: TranslateService
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<ProfileActions.ResetPasswordRequestAction>(
            ProfileActionTypes.RESET_PASSWORD_REQUEST
        ),
        switchMap(action =>
            this.http
                .put(API_PATH + "/reset-password", action.payload)
                .pipe(
                    map((response) => {
                        return new ProfileActions.ResetPasswordSuccessAction(response);
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new ProfileActions.ResetPasswordFailureAction(response?.error?.errors))
                    })
                )
        ),
        share()
    );


    @Effect({ dispatch: false })
    onSuccess = this.actions.pipe(
        ofType(ProfileActionTypes.RESET_PASSWORD_SUCCESS),
        tap(_ => {
            this.location.back()
            this.toastr.success(this.translate.instant("SAVED"));
        })
    )

    @Effect({ dispatch: false })
    onError = this.actions.pipe(
        ofType(ProfileActionTypes.RESET_PASSWORD_FAILURE),
        tap(_ => {
            this.toastr.error(this.translate.instant("SAVED_FAILED"));
        })
    )
}