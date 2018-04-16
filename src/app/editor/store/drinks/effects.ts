import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { ActionTypes, AddDrink, LoadDrinksSuccess, RemoveDrink, UpdateDrink, } from './actions';

import { FirebaseService } from '../../../core/services/firebase.service';
import { DrinkRecipe } from '../../../core/models/visualisation';

@Injectable()
export class DrinksEffects {

	@Effect()
	public loadDrinks$: Observable<Action> = this.actions$.pipe(
		ofType( ActionTypes.LoadDrinks ),
		switchMap( () => this.firebaseService.getDrinks() ),
		map( (drinks: DrinkRecipe[]) => new LoadDrinksSuccess( drinks ) )
	);

	@Effect( { dispatch: false } )
	public addDrink$: Observable<void> = this.actions$.pipe(
		ofType( ActionTypes.AddDrink ),
		map( (action: AddDrink) => action.payload ),
		map( (drink: DrinkRecipe) => this.firebaseService.addDrink( drink ) )
	);

	@Effect( { dispatch: false } )
	public updateDrink$: Observable<void> = this.actions$.pipe(
		ofType( ActionTypes.UpdateDrink ),
		map( (action: UpdateDrink) => action.payload ),
		map( (drink: DrinkRecipe) => this.firebaseService.updateDrink( drink ) )
	);

	@Effect( { dispatch: false } )
	public removeDrink$: Observable<void> = this.actions$.pipe(
		ofType( ActionTypes.RemoveDrink ),
		map( (action: RemoveDrink) => action.payload ),
		map( (drink: DrinkRecipe) => this.firebaseService.removeDrink( drink ) )
	);


	constructor(private actions$: Actions, private firebaseService: FirebaseService) {
	}
}

