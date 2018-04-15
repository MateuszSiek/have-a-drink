import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { getCurrentDrink, getDrinks } from '../store/selectors';
import * as actions from '../store/actions';
import { AppRootState } from '../../core/state';
import { DrinkRecipe } from '../../core/models/visualisation';


@Injectable()
export class StoreService {

	constructor( private store: Store<AppRootState>, ) {
	}

	public loadDrinks(): void {
		this.store.dispatch(new actions.Load());
	}

	public setNextDrink(): void {
		this.store.dispatch(new actions.SetNextDrink());
	}

	public setPreviousDrink(): void {
		this.store.dispatch(new actions.SetPreviousDrink());
	}

	public setCurrentDrinkById( id: string ): void {
		this.store.dispatch(new actions.SetDrinkById(id));
	}

	public setCurrentDrinkByName( name: string ): void {
		this.store.dispatch(new actions.SetDrinkByName(name));
	}

	public getCurrentDrink(): Observable<DrinkRecipe | undefined> {
		return this.store.select(getCurrentDrink);
	}

	public getAllDrinks(): Observable<DrinkRecipe[]> {
		return this.store.select(getDrinks);
	}
}
