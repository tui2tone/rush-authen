import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';

const routes: Routes = [{
    path: '',
    component: SigninComponent
},{
    path: 'callback',
    component: CallbackComponent
},{
    path: 'signout-callback',
    component: SignoutCallbackComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
