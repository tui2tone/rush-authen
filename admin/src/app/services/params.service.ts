import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router, RoutesRecognized } from '@angular/router'
import { distinctUntilChanged, filter, map } from 'rxjs/operators'
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';

const integerKeys = ['projectId']

@Injectable({
    providedIn: 'root'
})
export class ParamsService {

    public _params: any = {};
    public params: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public paramsChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    subscribers: Subscription[] = []
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.subscribeToRouterParams();
    }

    subscribeToRouterParams() {
        this.paramsChange.pipe(distinctUntilChanged()).subscribe((params) => {
            this._params = {
                ...params
            };
            this.addToObservable()
        })
        this.router.events.subscribe(val => {
            let r = this.route
            while (r.firstChild) {
                r = r.firstChild
            }
            r.params.subscribe(params => {
                this.paramsChange.next(params)
            })
        });
    }

    addToObservable() {
        integerKeys.map((key) => {
            if (this._params && this._params[key]) {
                this._params[key] = parseInt(this._params[key])
            }
        })
        this.params.next(this._params)
    }
}
