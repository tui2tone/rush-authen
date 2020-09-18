import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthState } from '../store/auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-app-container',
    templateUrl: './app-container.component.html',
    styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit, OnDestroy {

    subscriber: Subscription[] = [];

    constructor(
        private store: Store<AuthState.State>
    ) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
