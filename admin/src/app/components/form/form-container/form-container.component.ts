import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-container',
    templateUrl: './form-container.component.html',
    styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

    @Input() border: boolean = true;
    constructor() { }

    ngOnInit(): void {
    }

}
