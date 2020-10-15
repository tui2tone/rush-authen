import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthState, AuthSelectors, AuthActions } from '../store/auth';
import { Store } from '@ngrx/store';
import { AuthState as AuthStateId } from '../store/auth/auth.state';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    isAuthorized: Observable<AuthStateId>;
    constructor(
        private store: Store<AuthState.State>,
        public auth: AuthService,
        public router: Router,
        private ngZone: NgZone
    ) {
        this.isAuthorized = this.store.select(AuthSelectors.selectIsAuthorized)
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.isAuthorized
                .pipe(distinctUntilChanged())
                .subscribe((isAuthorized) => {
                    if (isAuthorized === AuthStateId.Authorized) {
                        return resolve(true)
                    } else if (isAuthorized === AuthStateId.Unauthorized) {
                        this.router.navigate(['/auth'])
                        return resolve(false)
                    } else if (isAuthorized === AuthStateId.Empty) {
                        this.auth.mgr.getUser()
                            .then((user) => {

                                this.ngZone.run(() => {
                                    if (user) {
                                        const accessToken = user.access_token
                                        this.auth.setToken(accessToken)
                                        this.store.dispatch(new AuthActions.LoadSuccessAction({
                                            token: user.access_token,
                                            permissions: user.scopes
                                        }));
                                    } else {
                                        this.router.navigate(['/auth'])
                                    }
                                })
                            })
                            .catch((err) => {
                                this.ngZone.run(() => {
                                    this.router.navigate(['/auth'])
                                })
                            });
                    }
                })
        })
    }
}
