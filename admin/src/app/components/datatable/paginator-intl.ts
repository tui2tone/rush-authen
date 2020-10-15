import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class MyMatPaginatorIntl {
    itemsPerPageLabel = 'Items per page';
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';
    ofLabel = 'of'

    constructor(
        private translateService: TranslateService
    ) {
    }

    getTranslations() {
        const paginatorIntl = new MatPaginatorIntl();

        paginatorIntl.itemsPerPageLabel = 'Items per page';
        paginatorIntl.nextPageLabel = 'Next page';
        paginatorIntl.previousPageLabel = 'Previous page';
        this.previousPageLabel = 'Of';
        paginatorIntl.getRangeLabel = this.rangeLabel;
        
        this.translateService.stream([
            'ITEMS_PER_PAGE',
            'NEXT_PAGE',
            'PREVIOUS_PAGE',
            'OF'
        ])
            .subscribe(translation => {
                paginatorIntl.itemsPerPageLabel = translation['ITEMS_PER_PAGE'];
                paginatorIntl.nextPageLabel = translation['NEXT_PAGE'];
                paginatorIntl.previousPageLabel = translation['PREVIOUS_PAGE'];
                this.ofLabel = translation['OF'];
                paginatorIntl.changes.next();
            });

        return paginatorIntl;
    }


    rangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) { return `0 ${this.ofLabel} ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} ${this.ofLabel} ${length}`;
    }
}