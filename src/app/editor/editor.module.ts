import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddGlassComponent } from './add-glass/add-glass.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { GlassesListComponent } from './glasses-list/glasses-list.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { GlassPreviewComponent } from './glass-preview/glass-preview.component';
import { DrinksListComponent } from './drinks-list/drinks-list.component';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { LoginComponent } from './login/login.component';
import { IsAuthenticatedGuard } from '../core/guards/is-authenticated.guard';
import { IsAnonymousGuard } from '../core/guards/is-anonymous.guard';
import { EffectsModule } from '@ngrx/effects';
import { mainAppInitialState, mainAppReducer } from '../main-app/store/reducers';
import { StoreModule } from '@ngrx/store';
import { editorInitialState, editorReducers } from './store';
import { DrinksEffects } from './store/drinks/effects';
import { GlassesEffects } from './store/glasses/effects';
import { IngredientsEffects } from './store/ingredients/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreService } from './services/store.service';

@NgModule({
	imports        : [
		SharedModule,
		EditorRoutingModule,
		StoreModule.forFeature('EDITOR', editorReducers, { initialState: editorInitialState }),
		EffectsModule.forFeature([ DrinksEffects, GlassesEffects, IngredientsEffects ]),
	],
	declarations   : [
		AddGlassComponent,
		AddIngredientComponent,
		AddDrinkComponent,
		GlassesListComponent,
		IngredientsListComponent,
		GlassPreviewComponent,
		DrinksListComponent,
		EditorComponent,
		LoginComponent
	],
	providers      : [
		StoreService,
		IsAuthenticatedGuard,
		IsAnonymousGuard
	],
	entryComponents: [ AddGlassComponent, AddIngredientComponent, AddDrinkComponent ],
})
export class EditorModule {}
