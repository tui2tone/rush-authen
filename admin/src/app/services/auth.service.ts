import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserManager, User } from 'oidc-client';
import { AuthActions, AuthState } from '../store/auth';
import { EnvironmentService } from './environment.service';

@Injectable()
export class AuthService {

    mgr: UserManager = null;
    token: string = null;

    constructor(
        private store: Store<AuthState.State>,
        private router: Router,
        private ngZone: NgZone,
        private env: EnvironmentService
    ) {
    }

    init() {
        this.mgr = new UserManager(this.env.config);
    }

    signin() {
        this.mgr.signinRedirect({})
    }

    async signinRedirectCallback() {
        try {
            const user = await this.mgr.signinRedirectCallback()
            this.setToken(user.access_token)
            this.ngZone.run(() => {
                this.store.dispatch(new AuthActions.LoadSuccessAction({
                    token: user.access_token,
                    permissions: user.scopes
                }));
                this.router.navigate(['/'])
            })
        } catch (error) {
            console.error(error)
            this.store.dispatch(new AuthActions.LoadFailureAction(error));
        }
    }

    async signout() {
        this.mgr.signoutRedirect()
    }

    async signoutRedirectCallback() {
        try {
            // const user = await this.mgr.signoutRedirectCallback()
        } catch (error) {
            this.store.dispatch(new AuthActions.LoadFailureAction(error));
        }
    }

    setToken(token: string) {
        this.token = token;
    }
}
