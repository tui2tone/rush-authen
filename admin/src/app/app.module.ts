import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppStoreModule } from './store/store.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientInterceptor } from "./utils/http-client-interceptor";

import { AppComponentsModule } from './components/components.module';
import { SidebarService } from './services/sidebar.service';
import { EnvironmentService } from './services/environment.service';
import { ParamsService } from './services/params.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/languages/');
}

export function environmentServiceFactory(envService: EnvironmentService): Function {
    return () => envService.load();
}

@NgModule({
    declarations: [
        AppComponent,
        AppContainerComponent
    ],
    imports: [
        BrowserModule,
        StoreModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        AppStoreModule,
        AppRoutingModule,
        AppComponentsModule,
        LoadingBarHttpClientModule,
        NgxSmartModalModule.forRoot(),
        NgxMaskModule.forRoot({}),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: environmentServiceFactory,
            deps: [EnvironmentService],
            multi: true
        },
        AuthService,
        AuthGuardService,
        SidebarService,
        ParamsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpClientInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        library: FaIconLibrary
    ) {
        library.addIconPacks(fas);
        library.addIconPacks(far);
    }
}
