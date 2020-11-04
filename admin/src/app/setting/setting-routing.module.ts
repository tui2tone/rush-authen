import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthProviderComponent } from './oauth-provider/oauth-provider.component';
import { SettingComponent } from './setting.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [{
    path: '',
    component: SettingComponent,
    data: {
        title: 'Setting',
        menu: 'setting'
    },
    children: [{
        path: 'providers',
        component: OauthProviderComponent
    }, {
        path: 'site',
        component: SiteComponent
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
