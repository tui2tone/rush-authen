import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Menu } from '../components/sidebar/menu';
import { AuthState } from '../store/auth';
import { ProfileActions } from '../store/profile';

@Component({
    selector: 'app-app-container',
    templateUrl: './app-container.component.html',
    styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

    menu: Menu[] = [
        new Menu({
            name: 'Dashboard',
            icon: 'th-large',
            link: '/dashboard'
        }),
        new Menu({
            name: 'Projects',
            icon: 'archive',
            link: '/projects'
        })
    ]
    constructor(
        private store$: Store<AuthState.State>
    ) { }

    ngOnInit() {
        this.store$.dispatch(new ProfileActions.LoadRequestAction());
    }

}
