import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { metaReducers, reducers } from './store/reducers';
import { StoreService } from './services/store.service';
import { DrinksEffects } from './store/effects';
import { environment } from '../../environments/environment';
import { FirebaseService } from './services/firebase.service';

const FirebaseModules = [
	AngularFireModule.initializeApp(environment.firebase),
	AngularFireDatabaseModule,
	AngularFireAuthModule
];

@NgModule({
	imports     : [
		CommonModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([ DrinksEffects ]),
		StoreDevtoolsModule.instrument({
			maxAge: 5
		}),
		...FirebaseModules
	],
	providers   : [
		StoreService,
		FirebaseService
	],
	declarations: []
})
export class CoreModule {
}
