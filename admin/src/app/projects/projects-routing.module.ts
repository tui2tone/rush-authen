import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ProjectsComponent } from './projects.component';
import { StatsComponent } from './stats/stats.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: ProjectsComponent,
    data: {
        title: 'Project',
        menu: 'project'
    },
    children: [{
        path: '',
        component: ListComponent,
        data: {
            title: 'Project',
            menu: 'main'
        }
    }, {
        path: 'create',
        component: CreateComponent,
        data: {
            title: 'Project',
            menu: 'main'
        }
    }, {
        path: ':projectId',
        component: ViewComponent,
        children: [
            {
                path: 'stats',
                component: StatsComponent
            }, {
                path: 'clients',
                loadChildren: () => import('../clients/clients.module').then(m => m.ClientsModule)
            }, {
                path: 'setting',
                loadChildren: () => import('./project-setting/project-setting.module').then(m => m.ProjectSettingModule)
            }, {
                path: '',
                redirectTo: 'stats'
            }
        ]
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
