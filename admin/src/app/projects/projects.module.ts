import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponentsModule } from '../components/components.module';
import { AppDirectivesModule } from '../directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './list/list-item/list-item.component';
import { FormComponent } from './form/form.component';
import { ListCreateItemComponent } from './list/list-create-item/list-create-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StatsComponent } from './stats/stats.component';
import { ProjectsComponent } from './projects.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
    declarations: [ViewComponent, ListComponent, CreateComponent, ListItemComponent, FormComponent, ListCreateItemComponent, StatsComponent, ProjectsComponent],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        AppComponentsModule,
        AppDirectivesModule,
        NgxDatatableModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        InfiniteScrollModule
    ],
    exports: [
        ListItemComponent
    ]
})
export class ProjectsModule { }
