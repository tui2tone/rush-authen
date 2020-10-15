import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
    selector: '[appColumn]',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    host: {
        class: 'w-full px-1 mb-1 sm:w-full lg:w-1/2'
    }
})
export class ColumnComponent implements OnInit {

    @Input() fullWidth: boolean = false;
    @Input() triWidth: boolean = false;
    @Input() quadWidth: boolean = false;
    @Input() fiveWidth: boolean = false;
    @Input() sixWidth: boolean = false;

    @HostBinding('class.lg:w-full') get getFull() { return this.fullWidth; }
    @HostBinding('class.lg:w-1/3') get getTri() { return this.triWidth; }
    @HostBinding('class.md:w-1/2') get getTri2() { return this.triWidth; }
    @HostBinding('class.lg:w-1/4') get getQuad() { return this.quadWidth; }
    @HostBinding('class.md:w-1/2') get getQuad2() { return this.quadWidth; }
    @HostBinding('class.lg:w-1/5') get getFive() { return this.fiveWidth; }
    @HostBinding('class.md:w-1/2') get getFive2() { return this.fiveWidth; }
    @HostBinding('class.lg:w-1/6') get getSix() { return this.sixWidth; }
    @HostBinding('class.md:w-1/2') get getSix2() { return this.sixWidth; }

    constructor() { }

    ngOnInit() {
    }

}
