import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Config, { getAppUrl } from 'src/app/constants';
import { ApplicationDto } from '../interfaces/application.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

    id: number;
    isLoading: boolean = false;
    disabled: boolean = true;
    data: ApplicationDto = null;
    error: any = null

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private location: Location
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

    async onSubmit(data: ApplicationDto) {
        try {
            const response = await this.http.patch(`${Config.API_URL.APPLICATION}/${this.id}`, data).toPromise();
            this.location.back();
        } catch (error) {
            console.error(error)
        }
    }

}
