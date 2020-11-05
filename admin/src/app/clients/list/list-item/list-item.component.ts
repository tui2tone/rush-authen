import { Component, Input, OnInit } from '@angular/core';
import Config from 'src/app/constants';
import { ClientDto } from '../../interfaces/client.interface';

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

    viewLink(item: ClientDto) {
        return `${Config.APP_URL.PROJECT}/${item.projectId}/${Config.APP_URL.CLIENT}/${item.id}`;
    }

}
