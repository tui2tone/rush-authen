import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSettingRoutingModule } from './site-setting-routing.module';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ViewComponent, FormComponent],
  imports: [
    CommonModule,
    SiteSettingRoutingModule
  ]
})
export class SiteSettingModule { }
