import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ViewComponent, FormComponent],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule
  ]
})
export class ProjectSettingModule { }
