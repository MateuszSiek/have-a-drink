import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { storeFreeze } from 'ngrx-store-freeze';
import { appRootInitialState, appRootReducers, metaReducers } from './state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const FirebaseModules = [
	AngularFireModule.initializeApp(environment.firebase),
	AngularFireDatabaseModule,
	AngularFireAuthModule
];

@NgModule({
	imports     : [
		BrowserModule,
		BrowserAnimationsModule,
		StoreModule.forRoot(appRootReducers, { initialState: appRootInitialState, metaReducers }),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 5
		}),
		...FirebaseModules
	],
	providers   : [
		FirebaseService
	],
	declarations: []
})
export class CoreModule {
}
