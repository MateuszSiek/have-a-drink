import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

import { MockedDrinks } from '../../../../testing/fixtures/drinks';

import { appRootReducers, AppRootState } from '../../core/state';
import { mainAppInitialState, mainAppReducer, MainAppState } from './reducers';
import {
	ActionTypes, Load, LoadComplete, LoadFail, SetCurrentDrink, SetDrinkById, SetDrinkByName, SetNextDrink,
	SetPreviousDrink
} from './actions';

describe('#ingredientsReducer', () => {
	let store: Store<AppRootState>;
	let state: MainAppState;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot(appRootReducers),
			],
		});
		store = TestBed.get(Store);
		state = mainAppReducer(undefined, {} as any);
	});

	it(`${ActionTypes.Load}: should produce state`, () => {
		expect(state.loading).toBeFalsy();
		state = mainAppReducer(mainAppInitialState, new Load());
		expect(state.loading).toBeTruthy();
	});

	it(`${ActionTypes.LoadComplete}: should produce state`, () => {
		state = mainAppReducer(mainAppInitialState, new LoadComplete(MockedDrinks));
		expect(state.loading).toBeFalsy();
		expect(state.drinks).toEqual(MockedDrinks);
	});

	it(`${ActionTypes.LoadFail}: should produce state`, () => {
		state = mainAppReducer(mainAppInitialState, new LoadFail());
		expect(state.loading).toBeFalsy();
		expect(state.loadFail).toBeTruthy();
	});

	it(`${ActionTypes.SetCurrentDrink}: should produce state`, () => {
		state = mainAppReducer(mainAppInitialState, new SetCurrentDrink(MockedDrinks[ 1 ]));
		expect(state.currentDrink).toEqual(MockedDrinks[ 1 ]);
	});

	it(`${ActionTypes.SetNextDrink}: should produce state`, () => {
		state = mainAppReducer({
			...mainAppInitialState,
			drinks      : MockedDrinks,
			currentDrink: MockedDrinks[ 1 ]
		}, new SetNextDrink());

		expect(state.currentDrink).toEqual(MockedDrinks[ 2 ]);
	});

	it(`${ActionTypes.SetPreviousDrink}: should produce state`, () => {
		state = mainAppReducer({
			...mainAppInitialState,
			drinks      : MockedDrinks,
			currentDrink: MockedDrinks[ 1 ]
		}, new SetPreviousDrink());

		expect(state.currentDrink).toEqual(MockedDrinks[ 0 ]);
	});

	it(`${ActionTypes.SetDrinkById}: should produce state`, () => {
		state = mainAppReducer({
			...mainAppInitialState,
			drinks: MockedDrinks,
		}, new SetDrinkById(MockedDrinks[ 2 ].id));

		expect(state.currentDrink).toEqual(MockedDrinks[ 2 ]);
	});

	it(`${ActionTypes.SetDrinkByName}: should produce state`, () => {
		state = mainAppReducer({
			...mainAppInitialState,
			drinks: MockedDrinks,
		}, new SetDrinkByName(MockedDrinks[ 1 ].name));

		expect(state.currentDrink).toEqual(MockedDrinks[ 1 ]);
	});
});
