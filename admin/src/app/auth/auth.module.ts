import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { CallbackComponent } from './callback/callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';


@NgModule({
  declarations: [SigninComponent, CallbackComponent, SignoutCallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
