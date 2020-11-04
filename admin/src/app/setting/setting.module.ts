import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { OauthProviderComponent } from './oauth-provider/oauth-provider.component';
import { SiteComponent } from './site/site.component';
import { SettingComponent } from './setting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppDirectivesModule } from '../directives/directives.module';
import { AppComponentsModule } from '../components/components.module';


@NgModule({
    declarations: [OauthProviderComponent, SiteComponent, SettingComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        AppComponentsModule,
        AppDirectivesModule,
        NgxDatatableModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule
    ]
})
export class SettingModule { }
