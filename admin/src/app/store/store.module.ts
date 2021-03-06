import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileModule } from './profile';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthModule,
        ProfileModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false
            }
        }),
        EffectsModule.forRoot([])
    ]
})
export class AppStoreModule { }
