import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppDirectivesModule } from '../directives/directives.module';
import { AppComponentsModule } from '../components/components.module';
import { SettingComponent } from './setting.component';


@NgModule({
    declarations: [SettingComponent],
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
