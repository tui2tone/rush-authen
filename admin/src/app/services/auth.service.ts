import { Injectable, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserManager, User } from 'oidc-client';
import { OAuthConfig } from '../config/oauth';
import { AuthActions, AuthState } from '../store/auth';

@Injectable()
export class AuthService {

    mgr: UserManager = new UserManager(OAuthConfig);
    token: string = null;

    constructor(
        private store: Store<AuthState.State>,
        private router: Router,
        private ngZone: NgZone
    ) {
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
