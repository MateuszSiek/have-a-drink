import { ErrorHandler, NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { appRootInitialState, appRootReducers, metaReducers } from './state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandlerService, rollbarFactory, RollbarService } from './services/global-error-handler.service';

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
		environment.production ? [] : StoreDevtoolsModule.instrument({ name: 'Have a Drink', maxAge: 50 }),
		...FirebaseModules
	],
	providers   : [
		FirebaseService,
		{ provide: ErrorHandler, useClass: GlobalErrorHandlerService },
		{ provide: RollbarService, useFactory: rollbarFactory }
	],
	declarations: []
})
export class CoreModule {
}
