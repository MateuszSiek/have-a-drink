import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { MockedDrinks } from '../../../../testing/fixtures/drinks';

import { appRootInitialState, appRootReducers, AppRootState } from '../../core/state';
import { mainAppInitialState, MainAppState } from './reducers';
import { DrinkRecipe } from '../../core/models/visualisation';
import { getCurrentDrink, getCurrentDrinkName, getDrinks, getState } from './selectors';
import { LoadComplete, SetCurrentDrink } from './actions';

describe('Main-app selectors:', () => {
	let store: Store<AppRootState>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot(appRootReducers, { initialState: appRootInitialState }),
			],
		});
		store = TestBed.get(Store);
	});

	it('#getState should return drink', () => {
		let result: MainAppState | undefined;
		store.select(getState).subscribe(d => result = d);
		expect(result).toEqual(mainAppInitialState);
	});

	it('#getCurrentDrink should return drink', () => {
		let result: DrinkRecipe | undefined;
		store.select(getCurrentDrink).subscribe(d => result = d);
		store.dispatch(new SetCurrentDrink(MockedDrinks[ 0 ]));
		expect(result).toEqual(MockedDrinks[ 0 ]);
	});

	it('#getDrinks should return all drinks', () => {
		let result: DrinkRecipe[] | undefined;
		store.select(getDrinks).subscribe(d => result = d);
		store.dispatch(new LoadComplete(MockedDrinks));
		expect(result).toEqual(MockedDrinks);
	});

	it('#getCurrentDrinkName should return all drinks', () => {
		let result: string | undefined;
		store.select(getCurrentDrinkName).subscribe(d => result = d);
		store.dispatch(new SetCurrentDrink(MockedDrinks[ 0 ]));
		expect(result).toEqual(MockedDrinks[ 0 ].name);
	});
});