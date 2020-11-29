import { Injectable, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserManager, User } from 'oidc-client';
import { AuthActions, AuthState } from '../store/auth';
import { EnvironmentService } from './environment.service';
import { environment as ENV } from 'src/environments/environment';
import { ProfileActions } from '../store/profile';

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
        if (ENV.skipAuth) {
            return this.store.dispatch(new AuthActions.LoadSuccessAction({
                token: '',
                permissions: []
            }));
        }
        this.mgr = new UserManager(this.env.config);
    }

    signin() {
        this.mgr.signinRedirect({})
    }

    async signinRedirectCallback() {
        try {
            const session = await this.mgr.signinRedirectCallback()
            const user = await this.mgr.getUser()
            console.log(user)
            this.setToken(session.access_token)
            this.ngZone.run(() => {
                this.store.dispatch(new AuthActions.LoadSuccessAction({
                    token: session.access_token,
                    permissions: session.scopes
                }));

                this.store.dispatch(new ProfileActions.LoadSuccessAction({
                    ...session.profile
                } as any));
                this.router.navigate(['/'])
            })
        } catch (error) {
            console.error(error)
            this.store.dispatch(new AuthActions.LoadFailureAction(error));
        }
    }

    async signout() {
        this.mgr.signoutRedirect({
            post_logout_redirect_uri: window.location.origin
        })
    }

    setToken(token: string) {
        this.token = token;
    }
}
