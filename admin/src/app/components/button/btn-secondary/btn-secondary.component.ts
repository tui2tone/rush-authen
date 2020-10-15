import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[btnSecondary]',
    templateUrl: './btn-secondary.component.html',
    styleUrls: ['./btn-secondary.component.scss'],
    host: {
        class: 'flex items-center bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline'
    }
})
export class BtnSecondaryComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
