import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import { MockedDrinks } from '../fixtures/drinks';
import * as actions from '../../src/app/main-app/store/actions';
import { DrinkRecipe } from '../../src/app/core/models/visualisation';
import { getCurrentDrink } from '../../src/app/main-app/store/selectors';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MockMainAppStoreService {
	public loadDrinks(): void {}

	public setNextDrink(): void {}

	public setPreviousDrink(): void {}

	public setCurrentDrinkById( id: string ): void {}

	public setCurrentDrinkByName( name: string ): void {}

	public getCurrentDrink(): Observable<DrinkRecipe> {
		return of(MockedDrinks[ 0 ]);
	}

	public getAllDrinks(): Observable<DrinkRecipe[]> {
		return of(MockedDrinks);
	}
}
