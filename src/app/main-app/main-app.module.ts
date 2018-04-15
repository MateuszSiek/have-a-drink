import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { MainAppRoutingModule } from './main-app-routing.module';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { TitleComponent } from './title/title.component';
import { DescriptionComponent } from './description/description.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';

import { DrinksEffects } from './store/effects';
import { mainAppInitialState, mainAppReducer } from './store/reducers';
import { StoreService } from './services/store.service';

@NgModule({
	imports     : [
		CommonModule,
		MainAppRoutingModule,
		ReactiveFormsModule,
		StoreModule.forFeature('APP', mainAppReducer, { initialState: mainAppInitialState }),
		EffectsModule.forFeature([ DrinksEffects ]),
	],
	declarations: [
		MainAppComponent,
		VisualisationComponent,
		TitleComponent,
		DescriptionComponent,
		DrinksListComponent
	],
	providers   : [
		StoreService,
	]
})
export class MainAppModule {}
