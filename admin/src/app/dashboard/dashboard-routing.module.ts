import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: ViewComponent,
    data: {
        title: 'Dashboard'
    }

}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
