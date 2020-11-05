import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-oauth-provider',
    templateUrl: './oauth-provider.component.html',
    styleUrls: ['./oauth-provider.component.scss']
})
export class OauthProviderComponent implements OnInit {

    title: string = 'OAuth Providers';

    constructor() { }

    ngOnInit(): void {
    }

}
