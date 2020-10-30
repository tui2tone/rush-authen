import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions, AuthState } from 'src/app/store/auth';
import { OAuthConfig } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    constructor(
        private store: Store<AuthState.State>,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        if (OAuthConfig.skip) {
            this.store.dispatch(new AuthActions.LoadSuccessAction({
                token: "xxxxx",
                permissions: []
            }));
            this.router.navigate(['/'])
            return null;
        }
        this.authService.signin()
    }

}
