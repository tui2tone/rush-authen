import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/constants';
import { BreadcrumbItemDto } from 'src/app/interfaces/breadcrumb-item.interface';

interface ClientQueryParams {
    projectId?: number
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    title: string = 'Clients';
    projectId: number = null;
    fixedParams: ClientQueryParams = {}
    breadcrumb: BreadcrumbItemDto[] = [{
        name: "Project",
        link: "/projects"
    }, {
        name: "Clients",
        link: "/stats"
    }]

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.projectId = parseInt(this.route.snapshot.paramMap.get("projectId"));
        this.fixedParams = {
            projectId: this.projectId
        }
    }

    createLink(): string {
        return `${Config.APP_URL.PROJECT}/${this.projectId}/${Config.APP_URL.CLIENT}/${Config.APP_URL.PAGE.CREATE}`;
    }

}
