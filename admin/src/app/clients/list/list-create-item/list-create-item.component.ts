import { Component, OnInit } from '@angular/core';
import Config from 'src/app/constants';

@Component({
    selector: 'app-list-create-item',
    templateUrl: './list-create-item.component.html',
    styleUrls: ['./list-create-item.component.scss']
})
export class ListCreateItemComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    createLink() {
        return `${Config.APP_URL.APPLICATION}/create`;
    }

}
