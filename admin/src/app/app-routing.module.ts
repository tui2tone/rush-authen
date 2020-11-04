import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AppContainerComponent } from './app-container/app-container.component';

const routes: Routes = [{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
}, {
    path: '',
    component: AppContainerComponent,
    canActivate: [AuthGuardService],
    children: [{
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'projects',
            loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
    }, {
        path: '',
            redirectTo: '/projects',
        pathMatch: 'full'
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        paramsInheritanceStrategy: 'always'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
