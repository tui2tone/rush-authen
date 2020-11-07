import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthProviderRoutingModule } from './oauth-provider-routing.module';
import { ListComponent } from './list/list.component';
import { AppComponentsModule } from 'src/app/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppDirectivesModule } from 'src/app/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { PasswordComponent } from './item/password/password.component';
import { OauthComponent } from './item/oauth/oauth.component';


@NgModule({
    declarations: [ListComponent, PasswordComponent, OauthComponent],
    imports: [
        CommonModule,
        OauthProviderRoutingModule,
        AppComponentsModule,
        AppDirectivesModule,
        NgxDatatableModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatExpansionModule
    ]
})
export class OauthProviderModule { }
