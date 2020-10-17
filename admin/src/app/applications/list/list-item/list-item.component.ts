import { Component, Input, OnInit } from '@angular/core';
import Config from 'src/app/constants';
import { ApplicationDto } from '../../interfaces/application.interface';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input() item: ApplicationDto;
    constructor() { }

    ngOnInit(): void {
    }

    viewLink(item: ApplicationDto) {
        return `${Config.APP_URL.APPLICATION}/${item.id}`;
    }

}
