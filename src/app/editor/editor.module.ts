import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
	MAT_DIALOG_DEFAULT_OPTIONS, MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDialogModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
	MatSlideToggleModule,
	MatTableModule
} from '@angular/material';

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
import { editorInitialState, editorReducers } from './store';
import { DrinksEffects } from './store/drinks/effects';
import { GlassesEffects } from './store/glasses/effects';
import { IngredientsEffects } from './store/ingredients/effects';
import { StoreService } from './services/store.service';
import { TableCellDirective } from './data-table/table-cell.directive';
import { DataTableComponent } from './data-table/data-table.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { IsAnonymousGuard } from './guards/is-anonymous.guard';

const MaterialModules = [
	MatTableModule,
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatSlideToggleModule,
	MatSelectModule,
	MatInputModule,
	MatGridListModule,
	MatCardModule,
	MatDialogModule,
	MatCheckboxModule,
	MatAutocompleteModule
];

const Components = [
	AddGlassComponent,
	AddIngredientComponent,
	AddDrinkComponent,
	GlassesListComponent,
	IngredientsListComponent,
	GlassPreviewComponent,
	DrinksListComponent,
	EditorComponent,
	LoginComponent,
	DataTableComponent,
];

const Directives = [ TableCellDirective ];

@NgModule({
	imports        : [
		SharedModule,
		EditorRoutingModule,
		StoreModule.forFeature('EDITOR', editorReducers, { initialState: editorInitialState }),
		EffectsModule.forFeature([ DrinksEffects, GlassesEffects, IngredientsEffects ]),
		...MaterialModules
	],
	declarations   : [ ...Components, ...Directives ],
	providers      : [
		StoreService,
		IsAuthenticatedGuard,
		IsAnonymousGuard,
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { maxWidth: '900px' } },
	],
	exports        : [ ...Components, ...Directives ],
	entryComponents: [ AddGlassComponent, AddIngredientComponent, AddDrinkComponent ],
})
export class EditorModule {}
