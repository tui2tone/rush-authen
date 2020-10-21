import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { StatsComponent } from './stats/stats.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: ListComponent
}, {
    path: 'create',
    component: CreateComponent
}, {
    path: ':id',
    component: ViewComponent,
    children: [
        {
            path: 'stats',
            component: StatsComponent
        }, {
            path: 'clients',
            loadChildren: () => import('../clients/clients.module').then(m => m.ClientsModule)
        }, {
            path: '',
            redirectTo: 'stats'
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
