import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { combineLatest, map, switchMap, tap } from 'rxjs/operators';

import { ActionTypes, Load, LoadComplete, SetCurrentDrink, SetDrinkByName } from './actions';
import { DrinkRecipe } from '../../core/models/visualisation';
import { FirebaseService } from '../../core/services/firebase.service';

@Injectable()
export class DrinksEffects {

	@Effect()
	public loadDrinks$: Observable<Action> = this.actions$.pipe(
		ofType<Load>(ActionTypes.Load),
		combineLatest(
			this.getTimestampFromLS(),
			this.firebaseService.getLastEdited(),
			this.getDrinkFromLS()
		),
		switchMap(( [ action, localTimestamp, remoteTimestamp, localDrinks ]:
			            [ Load, number | undefined, number | undefined, DrinkRecipe[] | undefined ] ) => {
			const validTimestamp = localTimestamp && remoteTimestamp && remoteTimestamp === localTimestamp;
			const validLocalDrinks = localDrinks && localDrinks.length;
			if ( validTimestamp && validLocalDrinks ) {
				return of(localDrinks);
			}
			return this.firebaseService.getDrinks()
			.pipe(tap(( d: DrinkRecipe[] ) => this.setDrinkToLs(d, remoteTimestamp)));
		}),
		map(( drinks: DrinkRecipe[] ) => new LoadComplete(drinks))
	);

	@Effect()
	public setCurrentDrink$: Observable<Action> = this.actions$.pipe(
		ofType<LoadComplete>(ActionTypes.LoadComplete),
		map(( action: LoadComplete ) => {
			const queryParams = this.route.snapshot.queryParams;
			if ( queryParams.drink ) {
				return new SetDrinkByName(queryParams.drink);
			}
			else {
				return new SetCurrentDrink(action.payload[ 0 ]);
			}
		})
	);

	private getDrinkFromLS(): Observable<DrinkRecipe[] | undefined> {
		return this.localStorage.getItem<DrinkRecipe[]>('drinks');
	}

	private getTimestampFromLS(): Observable<number | undefined> {
		return this.localStorage.getItem<number>('timestamp');
	}

	private setDrinkToLs( drinks: DrinkRecipe[], timestamp: number ): void {
		this.localStorage.setItem('drinks', drinks).subscribe(() => {});
		this.localStorage.setItem('timestamp', timestamp).subscribe(() => {});
	}

	constructor( private actions$: Actions,
	             private firebaseService: FirebaseService,
	             private localStorage: LocalStorage,
	             private route: ActivatedRoute ) {}
}

