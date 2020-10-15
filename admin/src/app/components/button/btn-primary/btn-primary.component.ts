import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[btnPrimary]',
    templateUrl: './btn-primary.component.html',
    styleUrls: ['./btn-primary.component.scss'],
    host: {
        class: 'flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow focus:outline-none focus:shadow-outline'
    }
})
export class BtnPrimaryComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
