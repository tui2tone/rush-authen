import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [{
    path: '',
    component: SigninComponent
},{
    path: 'callback',
    component: CallbackComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
