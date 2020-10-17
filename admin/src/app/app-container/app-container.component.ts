import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Menu } from '../components/sidebar/menu';

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
            name: 'Application',
            isHeader: true
        }),
        new Menu({
            name: 'Applications',
            icon: 'archive',
            link: '/applications'
        }),
        new Menu({
            name: 'User Management',
            isHeader: true
        }),
        new Menu({
            name: 'Users',
            icon: 'users',
            link: '/users'
        })
    ]
    constructor(
    ) { }

    ngOnInit() {
    }

}
