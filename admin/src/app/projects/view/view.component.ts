import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Config, { getAppUrl } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { ProjectDto } from '../interfaces/project.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: "app-view",
    templateUrl: "./view.component.html",
    styleUrls: ["./view.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {

    id: number;
    isLoading: boolean = false;
    disabled: boolean = true;
    data: ProjectDto = null;
    tabs: Object = {
        stats: 0,
        users: 1,
        roles: 2,
        clients: 3,
        setting: 4
    }
    selectedTab: number = 0

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get("projectId"));
        const routeConfig = this.route.snapshot.routeConfig
        if (routeConfig.children && routeConfig.children.length > 1) {
            this.selectedTab = this.tabs[routeConfig.children[1].path]
        }
        this.getData()
    }

    async getData() {
        try {
            this.isLoading = true;
            this.data = await this.http.get(`${Config.API_URL.PROJECT}/${this.id}`).toPromise() as ProjectDto
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error)
        }
    }

    updateLink() {
        return getAppUrl(Config.APP_URL.PROJECT + Config.APP_URL.PAGE.EDIT, this.id);
    }

    async remove() {
        
    }

    async onSubmit(data: ProjectDto) {
        try {
            const response = await this.http.patch(`${Config.API_URL.PROJECT}/${this.id}`, data).toPromise();
        } catch (error) {
            console.error(error)
        }
    }

    selectedTabChange(tab: MatTabChangeEvent) {
        const getTab = tab.tab.textLabel;
        this.router.navigate([Config.APP_URL.PROJECT, this.id, getTab])
    }
}
