import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[pageBody]',
    templateUrl: './page-body.component.html',
    styleUrls: ['./page-body.component.scss'],
    host: {
        class: 'p-2'
    }
})
export class PageBodyComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
