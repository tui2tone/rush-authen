import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title
    ) { }

    subscribe() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .pipe(map(() => this.activatedRoute))
            .pipe(map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }))
            .pipe(filter((route) => route.outlet === 'primary'))
            .pipe(mergeMap((route) => route.data))
            .subscribe((event) => {
                if (event['title']) {
                    this.title.setTitle(event['title'] + " - Rush Authen")
                } else {
                    this.title.setTitle("Rush Authen")
                }
            });
    }

}
