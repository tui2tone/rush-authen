import { Component, Input, OnInit } from '@angular/core';
import Config from 'src/app/constants';
import { ProjectDto } from '../../interfaces/project.interface';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input() item: ProjectDto;
    constructor() { }

    ngOnInit(): void {
    }

    viewLink(item: ProjectDto) {
        return `${Config.APP_URL.PROJECT}/${item.id}`;
    }

}
