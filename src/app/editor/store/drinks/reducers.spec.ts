import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { drinksInitialState, drinksReducer, DrinksState } from './reducers';
import { ActionTypes, AddDrink, LoadDrinks, LoadDrinksSuccess, RemoveDrink, UpdateDrink } from './actions';

import { MockedDrinks } from '../../../../../testing/fixtures/drinks';
import { appRootReducers, AppRootState } from '../../../core/state';

describe('#drinksReducer', () => {
	let store: Store<AppRootState>;
	let state: DrinksState;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot(appRootReducers),
			],
		});
		store = TestBed.get(Store);
		state = drinksReducer(undefined, {} as any);
	});

	it('should return default state', () => {
		expect(state).toBe(drinksInitialState);
	});

	it(`${ActionTypes.LoadDrinks}: should produce state`, () => {
		expect(state.loading).toBeFalsy();
		state = drinksReducer(drinksInitialState, new LoadDrinks());
		expect(state.loading).toBeTruthy();
	});

	it(`${ActionTypes.LoadDrinksSuccess} should produce state`, () => {
		state = drinksReducer(drinksInitialState, new LoadDrinksSuccess(MockedDrinks));
		expect(state.data).toEqual(MockedDrinks);
	});

	it(`${ActionTypes.AddDrink}: should produce state`, () => {
		expect(state.loading).toBeFalsy();
		state = drinksReducer(drinksInitialState, new AddDrink(MockedDrinks[ 0 ]));
		expect(state.data.length).toEqual(1);
		expect(state.data[ 0 ]).toEqual(MockedDrinks[ 0 ]);
	});

	it(`${ActionTypes.RemoveDrink}: should produce state`, () => {
		state = drinksReducer({ ...drinksInitialState, data: MockedDrinks }, new RemoveDrink(MockedDrinks[ 1 ]));
		expect(state.data.length).toEqual(MockedDrinks.length - 1);
		expect(state.data).not.toContain(MockedDrinks[ 1 ]);
	});

	it(`${ActionTypes.UpdateDrink}: should produce state`, () => {
		const updatedRecord = { ...MockedDrinks[ 1 ], name: 'new name' };
		state = drinksReducer({ ...drinksInitialState, data: MockedDrinks }, new UpdateDrink(updatedRecord));
		expect(state.data[ 1 ]).toEqual(updatedRecord);
	});
});