import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {


    title: string = 'Site Setting';
    constructor() { }

    ngOnInit(): void {
    }

}
