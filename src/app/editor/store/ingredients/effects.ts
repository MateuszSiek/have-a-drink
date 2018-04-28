import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import {
	ActionTypes,
	AddIngredient,
	LoadIngredients,
	LoadIngredientsSuccess,
	RemoveIngredient,
	UpdateIngredient
} from './actions';
import { Ingredient } from '../../../core/models/visualisation';
import { FirebaseService } from '../../../core/services/firebase.service';

@Injectable()
export class IngredientsEffects {
	@Effect()
	public loadIngredients$: Observable<Action> = this.actions$.pipe(
		ofType<LoadIngredients>(ActionTypes.LoadIngredients),
		switchMap(() => this.firebaseService.getIngredients()),
		map(( ingredients: Ingredient[] ) => new LoadIngredientsSuccess(ingredients))
	);

	@Effect({ dispatch: false })
	public addIngredient$: Observable<void> = this.actions$.pipe(
		ofType<AddIngredient>(ActionTypes.AddIngredient),
		map(( action: AddIngredient ) => action.payload),
		map(( ingredient: Ingredient ) => this.firebaseService.addIngredient(ingredient))
	);

	@Effect({ dispatch: false })
	public updateIngredient$: Observable<void> = this.actions$.pipe(
		ofType<UpdateIngredient>(ActionTypes.UpdateIngredient),
		map(( action: UpdateIngredient ) => action.payload),
		map(( ingredient: Ingredient ) => this.firebaseService.updateIngredient(ingredient))
	);

	@Effect({ dispatch: false })
	public removeIngredient$: Observable<void> = this.actions$.pipe(
		ofType<RemoveIngredient>(ActionTypes.RemoveIngredient),
		map(( action: RemoveIngredient ) => action.payload),
		map(( ingredient: Ingredient ) => this.firebaseService.removeIngredient(ingredient))
	);

	constructor( private actions$: Actions, private firebaseService: FirebaseService ) {
	}
}

