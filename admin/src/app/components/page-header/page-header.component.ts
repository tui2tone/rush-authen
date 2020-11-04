import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbItemDto } from 'src/app/interfaces/breadcrumb-item.interface';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    @Input() title: string = '';
    @Input() breadcrumb: BreadcrumbItemDto[] = [];

    constructor() { }

    ngOnInit() {
    }

}
