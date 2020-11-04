import { Component, OnInit } from '@angular/core';
import { BreadcrumbItemDto } from 'src/app/interfaces/breadcrumb-item.interface';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    breadcrumb: BreadcrumbItemDto[] = [{
        name: "Project",
        link: "/projects"
    }, {
        name: "Stats",
        link: "/stats"
    }]

    constructor() { }

    ngOnInit(): void {
    }

}
