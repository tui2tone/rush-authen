import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/constants';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    createLink(): string {
        return Config.APP_URL.APPLICATION + Config.APP_URL.PAGE.CREATE;
    }

}
