import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthProviderDto } from '../interfaces/oauth-provider.interface';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    items: OAuthProviderDto[] = [];
    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.getMethods()
    }

    async getMethods() {
        const result: any = await this.http.get('/oauth-providers/methods').toPromise()
        this.items = result.data as OAuthProviderDto[]
    }



}
