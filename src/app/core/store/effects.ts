import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { ActionTypes, LoadComplete, SetCurrentDrink } from './actions';
import { DRINKS } from '../data/drinks';
import { DrinkRecipe } from '../models/visualisation';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class DrinksEffects {

	@Effect()
	public loadDrinks$: Observable<Action> = this.actions$.pipe(
		ofType(ActionTypes.Load),
		switchMap( () => this.firebaseService.getDrinks() ),
		map( (drinks: DrinkRecipe[]) => new LoadComplete( drinks ) )
	);

	@Effect()
	public setCurrentDrink$: Observable<Action> = this.actions$.pipe(
		ofType(ActionTypes.LoadComplete),
		map(( action: LoadComplete ) => new SetCurrentDrink(action.payload[ 1 ]))
	);

	constructor( private actions$: Actions, private firebaseService: FirebaseService ) {}
}

