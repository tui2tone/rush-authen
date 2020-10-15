import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[btnSuccess]',
    templateUrl: './btn-success.component.html',
    styleUrls: ['./btn-success.component.scss'],
    host: {
        class: 'flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded shadow focus:outline-none focus:shadow-outline'
    }
})
export class BtnSuccessComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
