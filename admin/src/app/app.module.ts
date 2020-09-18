import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppStoreModule } from './store/store.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuardService
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
