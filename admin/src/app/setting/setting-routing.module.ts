import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [{
    path: '',
    component: SettingComponent,
    data: {
        title: 'Setting',
        menu: 'setting'
    },
    children: [{
        path: 'providers',
        loadChildren: () => import('./oauth-provider/oauth-provider.module').then(m => m.OauthProviderModule)
    }, {
        path: 'site',
        loadChildren: () => import('./site-setting/site-setting.module').then(m => m.SiteSettingModule)
    }, {
        path: 'templates',
        loadChildren: () => import('./template-setting/template-setting.module').then(m => m.TemplateSettingModule)
    }, {
        path: '',
        redirectTo: '/setting/site',
        pathMatch: 'full'
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
