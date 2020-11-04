import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { RecentProjectsComponent } from './components/recent-projects/recent-projects.component';
import { AppComponentsModule } from '../components/components.module';
import { AppDirectivesModule } from '../directives/directives.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectsModule } from '../projects/projects.module';


@NgModule({
    declarations: [ViewComponent, RecentProjectsComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        AppComponentsModule,
        AppDirectivesModule,
        NgxDatatableModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        ProjectsModule
    ]
})
export class DashboardModule { }
