import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subscription } from 'rxjs';
import { OAuthProviderDto } from '../interfaces/oauth-provider.interface';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    params: any = {};
    items: OAuthProviderDto[] = [];
    subscriber: Subscription[] = [];
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.getMethods()

        const obsComb = combineLatest(this.route.params, this.route.queryParams,
            (params, qparams) => ({ params, qparams }));

        this.subscriber.push(obsComb.subscribe(ap => {
            // Reset To First Page
            this.params = {
                ...(ap.qparams as any)
            }
        }))
    }

    ngOnDestroy() {
        this.subscriber.map(m => m.unsubscribe())
    }
    
    async getMethods() {
        const result: any = await this.http.get('/oauth-providers/methods').toPromise()
        this.items = result.data as OAuthProviderDto[]
    }

    onUpdated(item, index) {
        this.items[index].isEnabled = item.isEnabled
    }
}
