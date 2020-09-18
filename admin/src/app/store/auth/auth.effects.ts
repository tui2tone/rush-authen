import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, share, timeout, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthActionTypes } from './auth.actions';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AuthSuccessResponse } from './auth.interface';
import { Router } from '@angular/router';

const API_PATH = '/auth'

@Injectable()
export class Get {
    constructor(
        private actions: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<AuthActions.LoadRequestAction>(
            AuthActionTypes.LOAD_REQUEST
        ),
        switchMap(_ =>
            this.http
                .get(API_PATH)
                .pipe(
                    map((response: any) => {
                        return new AuthActions.LoadSuccessAction(response);
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new AuthActions.LoadFailureAction(response?.error?.message))
                    })
                )
        ),
        share()
    );
}

@Injectable()
export class Signin {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private authService: AuthService
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<AuthActions.SigninRequestAction>(
            AuthActionTypes.SIGNIN_REQUEST
        ),
        switchMap(action =>
            this.http
                .post(API_PATH, action.payload)
                .pipe(
                    map((response: AuthSuccessResponse) => {
                        return new AuthActions.SigninSuccessAction(response);
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new AuthActions.SigninFailureAction(response?.error?.message))
                    })
                )
        ),
        share()
    );
}

@Injectable()
export class Signout {
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions.pipe(
        ofType<AuthActions.SignoutRequestAction>(
            AuthActionTypes.SIGNOUT_REQUEST
        ),
        switchMap(action =>
            this.http
                .delete(API_PATH)
                .pipe(
                    map((_) => {
                        return new AuthActions.SignoutSuccessAction();
                    }), catchError((response: HttpErrorResponse) => {
                        return observableOf(new AuthActions.SignoutFailureAction(response?.error?.error))
                    })
                )
        ),
        share()
    );


    @Effect({ dispatch: false })
    onSuccess = this.actions.pipe(
        ofType(AuthActionTypes.SIGNOUT_SUCCESS),
        tap(_ => {
            this.router.navigate(['/auth'])
        })
    )
}