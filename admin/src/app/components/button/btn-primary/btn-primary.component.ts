import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[btnPrimary]',
    templateUrl: './btn-primary.component.html',
    styleUrls: ['./btn-primary.component.scss'],
    host: {
        class: 'inline-flex items-center px-4 py-2 border border-transparent font-medium rounded shadow text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out'
    }
})
export class BtnPrimaryComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
