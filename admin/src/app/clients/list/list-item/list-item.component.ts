import { Component, Input, OnInit } from '@angular/core';
import Config from 'src/app/constants';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input() item;
    constructor() { }

    ngOnInit(): void {
    }

    viewLink(item) {
        return `${Config.APP_URL.PROJECT}/${item.id}`;
    }

}
