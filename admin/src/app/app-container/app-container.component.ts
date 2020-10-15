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
            name: 'DASHBOARD',
            icon: 'th-large',
            link: '/dashboard'
        })
    ]
    constructor(
    ) { }

    ngOnInit() {
    }

}
