import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: ListComponent
}, {
    path: 'create',
    component: CreateComponent
}, {
    path: ':id/edit',
    component: UpdateComponent
}, {
    path: ':id',
    component: ViewComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
