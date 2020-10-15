import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, ContentChildren, QueryList, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { Page } from './page';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'qs';
import { DataTableColumnDirective, DatatableComponent } from '@swimlane/ngx-datatable';
import { DatatableActivateEvent, DatatableSelectedEvent } from './datatable';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppDatatableComponent implements OnInit, OnDestroy {
    @ViewChild('paginator') paginator: MatPaginator;

    @Output() onSelected: EventEmitter<any> = new EventEmitter();
    @Output() onRowClick: EventEmitter<any> = new EventEmitter();
    @Output() onColumnChange: EventEmitter<any> = new EventEmitter();
    @Output() onFetch: EventEmitter<any> = new EventEmitter();
    @Input() url: string = '';
    @Input() columns = [];
    @Input() rowClass: any = () => '';
    @Input() columnMode: string = "force";
    @Input() summaryRow: boolean = false;
    @Input() isCheckable: boolean = false;
    @Input() isFilterable: boolean = true;
    @Input() headerHeight: number = 50;
    @Input() summaryPosition: string = 'top';
    @Input() summaryHeight: string = 'auto';
    @Input() scrollbarH: boolean = false;
    @Input() myRowDetail: any;
    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ContentChildren(DataTableColumnDirective) val: QueryList<DataTableColumnDirective>;

    @ViewChild('listFilter') listFilter;
    templateRef: TemplateRef<any>;

    query: FormControl = new FormControl('')
    subscriber: Subscription[] = [];

    isFilterOpen: boolean = true;

    columnSelector: FormControl = new FormControl('');
    rows: any[] = [];
    selected: any[] = [];
    sorts: any[] = [];
    searchTrigger = null;
    _query: string = "";
    _params: any = {};
    _fixedParams: any = {};
    error: boolean = false;
    customClasses = {
        sortAscending: 'fa fa-sort-asc',
        sortDescending: 'fa fa-sort-desc',
        pagerLeftArrow: 'fa fa-chevron-left',
        pagerRightArrow: 'fa fa-chevron-right',
        pagerPrevious: 'fa fa-step-backward',
        pagerNext: 'fa fa-step-forward'
    };
    pageSizes = [10, 20, 30, 50, 100]
    total: number = 0;
    limit: number = 10;
    page: number = 1;
    pageIndex: number = 0;
    offset: number = 1;

    @Input()
    set params(val) {
        this._fixedParams = val;
        this.onSearch()
    }

    constructor(
        private router: Router,
        private http$: HttpClient,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.setColumnTemplate()

        this.columnSelector.setValue(this.columns)
        this.subscriber.push(this.columnSelector.valueChanges.subscribe(val => {
            this.onColumnChange.emit(val)

            this.setColumnTemplate()
        }))

        this.subscriber.push(this.query.valueChanges.pipe(debounceTime(450)).subscribe(keywords => {
            this.router.navigate(
                [],
                {
                    relativeTo: this.route,
                    queryParams: {
                        keywords
                    },
                    queryParamsHandling: 'merge'
                });
        }))

        const obsComb = combineLatest(this.route.params, this.route.queryParams,
            (params, qparams) => ({ params, qparams }));

        this.subscriber.push(obsComb.subscribe(ap => {
            // Reset To First Page
            this._params = {
                ...(ap.qparams as any)
            }
            
            const currentKeyword = this.query.value
            if (currentKeyword != this._params.keywords) {
                this.query.setValue(this._params.keywords)
            }
            if (this._params.limit) {
                this.limit = this._params.limit
            } else {
                this.limit = 10
            }
            if (this._params.page) {
                this.page = this._params.page
                this.pageIndex = this.page - 1
            } else {
                this.page = 1;
                this.pageIndex = 0;
            }
            this.onSearch()
        }))
    }

    ngOnDestroy() {
        this.subscriber.map(m => m.unsubscribe())
    }

    setColumnTemplate() {
        setTimeout(() => {
            this.datatable.columnTemplates = this.val;
        }, 10);
    }

    fetch() {
        const order = (this.sorts || []).filter((item) => item.prop).map((item) => item.prop + "||" + item.dir).join("|||")
        const params = {
            page: 1,
            limit: 10,
            keywords: this._query,
            ...this._params,
            ...this._fixedParams,
            order
        }

        return this.http$
            .get(`${this.url}?${queryString.stringify(params)}`)
            .subscribe((data: any) => {

                this.total = data.total;
                this.page = data.page;
                this.pageIndex = data.page - 1
                this.offset = (data.page - 1) * this.limit

                this.rows = [
                    ...data.data
                ]

                if (this.onFetch) {
                    this.onFetch.emit(data)
                }

            }, (error) => {
                this.error = true;
            })
    }

    onSearch() {
        if (this.searchTrigger) {
            clearTimeout(this.searchTrigger);
        }

        this.searchTrigger = setTimeout(() => {
            this.search();
        }, 500);
    }

    setPaginationChange(page: PageEvent) {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {
                    page: page.pageIndex + 1,
                    limit: page.pageSize || 10
                },
                queryParamsHandling: 'merge'
            });
    }

    onSort(sort) {
        this.sorts = sort.sorts;
        this.search();
    }

    search() {
        this.clearError();
        this.clearSelected();
        this.fetch()
    }

    onSetPage(page) {
        this.fetch()
    }

    clearError() {
        this.error = false;
    }

    clearSelected() {
        this.selected = [];
        this.onSelect(null)
    }

    resetPage() {
    }

    onSelect(event: DatatableSelectedEvent) {
        this.onSelected.emit(this.selected)
    }

    onActivate(event: DatatableActivateEvent<any>) {
        if (isRowClicking(event, this.isCheckable)) {
            this.onRowClick.emit(event.row)
        }
    }

    onToggleFilter() {
        this.isFilterOpen = !this.isFilterOpen
    }
}


const isRowClicking = (event: any, isCheckable) => {
    if (event.column && event.column.prop === "action") {
        return false;
    }
    return event.type == 'click' && ((isCheckable && event.cellIndex != 0) || (!isCheckable))
}