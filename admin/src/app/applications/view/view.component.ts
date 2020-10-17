import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Config, { getAppUrl } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { ApplicationDto } from '../interfaces/application.interface';

@Component({
    selector: "app-view",
    templateUrl: "./view.component.html",
    styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {

    id: number;
    isLoading: boolean = false;
    disabled: boolean = true;
    data: ApplicationDto = null;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get("id"));
        this.getData()
    }

    async getData() {
        try {
            this.isLoading = true;
            this.data = await this.http.get(`${Config.API_URL.APPLICATION}/${this.id}`).toPromise() as ApplicationDto
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error)
        }
    }

    updateLink() {
        return getAppUrl(Config.APP_URL.APPLICATION + Config.APP_URL.PAGE.EDIT, this.id);
    }

    async remove() {
        
    }
}
