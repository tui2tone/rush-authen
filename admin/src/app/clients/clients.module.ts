import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppDirectivesModule } from '../directives/directives.module';
import { AppComponentsModule } from '../components/components.module';
import { ListItemComponent } from './list/list-item/list-item.component';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './form/form.component';
import { ClientService } from './client.service';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
    declarations: [ListComponent, ViewComponent, ListItemComponent, CreateComponent, FormComponent],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        AppComponentsModule,
        AppDirectivesModule,
        NgxDatatableModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        TimeagoModule
    ],
    providers: [
        ClientService
    ]
})
export class ClientsModule { }
