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
        path: 'applications',
        loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
    }, {
        path: '',
        redirectTo: '/applications',
        pathMatch: 'full'
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
