import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { StoreService } from './services/store.service';
import { DrinksEffects } from './store/effects';

@NgModule({
  imports     : [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ DrinksEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers   : [
    StoreService
  ],
  declarations: []
})
export class CoreModule {
}
