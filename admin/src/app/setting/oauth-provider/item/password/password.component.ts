import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { OAuthProviderDto } from '../../interfaces/oauth-provider.interface';

@Component({
    selector: 'app-item-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

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
