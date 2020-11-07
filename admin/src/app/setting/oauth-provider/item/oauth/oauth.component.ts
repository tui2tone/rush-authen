import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { OAuthProviderDto } from '../../interfaces/oauth-provider.interface';

@Component({
    selector: 'app-item-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

    @Input() providerId: number;
    data: OAuthProviderDto = null;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.getData()
    }

    async getData() {
        const result: any = await this.http.get(`/oauth-providers/${this.providerId}`).toPromise()
        this.data = result as OAuthProviderDto
    }

}
