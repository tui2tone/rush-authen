import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[appTHead]',
    templateUrl: './thead.component.html',
    styleUrls: ['./thead.component.scss'],
    host: {
        class: 'py-2 px-2 font-bold uppercase text-sm text-grey-dark border-b border-gray-light'
    }
})
export class TheadComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
