import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateSettingRoutingModule } from './template-setting-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [MenuComponent, FormComponent],
  imports: [
    CommonModule,
    TemplateSettingRoutingModule
  ]
})
export class TemplateSettingModule { }
