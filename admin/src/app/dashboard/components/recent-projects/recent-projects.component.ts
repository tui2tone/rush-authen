import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'qs';
import { ProjectDto } from 'src/app/projects/interfaces/project.interface';

@Component({
    selector: 'app-recent-projects',
    templateUrl: './recent-projects.component.html',
    styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent implements OnInit {

    title: string = 'Recent Projects';
    items: ProjectDto[] = [];

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.fetch()
    }

    fetch() {
        const params = {
            page: 1,
            limit: 4
        }

        return this.http
            .get(`/projects?${queryString.stringify({
                ...params
            })}`)
            .subscribe((data: any) => {
                this.items = data.data || [];
            }, (error) => {
                console.error(error)
            })
    }

}
