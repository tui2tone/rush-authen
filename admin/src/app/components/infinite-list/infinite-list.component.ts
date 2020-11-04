import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as queryString from 'qs';
import { combineLatest, Subscription } from 'rxjs';

@Component({
    selector: 'app-infinite-list',
    templateUrl: './infinite-list.component.html',
    styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit, OnDestroy, AfterContentInit {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() onFetch: EventEmitter<any> = new EventEmitter();
    @Input() url: string = '';
    @Input() params: any = {};

    subscriber: Subscription[] = [];
    items: any[] = [];

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const obsComb = combineLatest(this.route.params, this.route.queryParams,
            (params, qparams) => ({ params, qparams }));

        this.subscriber.push(obsComb.subscribe(ap => {
            this.fetch()
        }))
    }

    ngOnDestroy() {
        this.subscriber.map(m => m.unsubscribe())
    }

    ngAfterContentInit() {
    }

    onScrollUp() {

    }

    onScrollDown() {

    }

    fetch() {
        const params = {
            page: 1,
            limit: 10
        }

        return this.http
            .get(`${this.url}?${queryString.stringify({
                ...params,
                ...this.params
            })}`)
            .subscribe((data: any) => {

                this.items = data.data || [];
                if (this.onFetch) {
                    this.onFetch.emit(data)
                }

            }, (error) => {
                console.error(error)
            })
    }

}
