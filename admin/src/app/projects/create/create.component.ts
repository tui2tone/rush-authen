import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Config from 'src/app/constants';
import { ProjectDto } from '../interfaces/project.interface';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private location: Location
    ) { }

    ngOnInit(): void {
    }

    async onSubmit(data: ProjectDto) {
        try {
            const response = await this.http.post(Config.API_URL.PROJECT, data).toPromise();
            this.location.back();
        } catch (error) {
            console.error(error)
        }
    }

}
