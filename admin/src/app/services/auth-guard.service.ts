import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthState, AuthSelectors, AuthActions } from '../store/auth';
import { Store } from '@ngrx/store';
import { AuthState as AuthStateEnum } from '../store/auth/auth.state';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    isAuthorized: Observable<AuthStateEnum>;
    constructor(
        private store: Store<AuthState.State>,
        public auth: AuthService,
        public router: Router
    ) {
        this.isAuthorized = this.store.select(AuthSelectors.selectIsAuthorized)
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.isAuthorized
                .pipe(distinctUntilChanged())
                .subscribe((isAuthorized) => {
                    if (isAuthorized === AuthStateEnum.Authorized) {
                        return resolve(true)
                    } else if (isAuthorized === AuthStateEnum.Unauthorized) {
                        this.router.navigate(['/auth'], {
                            queryParams: {
                                callback: state.url ? state.url : null
                            }
                        });
                        return resolve(false)
                    } else if (isAuthorized === AuthStateEnum.Unchecking) {
                        this.store.dispatch(new AuthActions.LoadRequestAction());
                    }
                })
        })
    }
}
