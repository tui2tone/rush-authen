import { Injectable } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, mergeMap, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RouteDataService {

    public data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public dataChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.subscribe()
    }

    subscribe() {
        this.dataChange.pipe(distinctUntilChanged()).subscribe((params) => {
            this.data.next(params)
        })
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .pipe(map(() => this.activatedRoute))
            .pipe(map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }))
            .pipe(filter((route) => route.outlet === 'primary'))
            .pipe(mergeMap((route) => route.data))
            .subscribe((data) => {
                this.dataChange.next(data)
            });
    }

}
