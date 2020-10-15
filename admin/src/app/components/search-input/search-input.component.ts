import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
    @Input() query: FormControl;

    constructor() { }

    ngOnInit() {
    }

    onClear() {
        this.query.setValue('');
    }

}
