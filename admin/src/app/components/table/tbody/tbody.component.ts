import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[appTBody]',
    templateUrl: './tbody.component.html',
    styleUrls: ['./tbody.component.scss'],
    host: {
        class: 'py-2 px-2 border-b border-grey-light'
    }
})
export class TbodyComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
