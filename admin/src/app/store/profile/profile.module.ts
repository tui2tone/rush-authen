import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from './profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Get, Update, ResetPassword } from './profile.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('profile', fromProfile.reducer),
    EffectsModule.forFeature([
        Get,
        Update,
        ResetPassword
    ])
  ]
})
export class ProfileModule { }
