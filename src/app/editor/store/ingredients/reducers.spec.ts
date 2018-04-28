import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
	ActionTypes,
	AddIngredient,
	LoadIngredients,
	LoadIngredientsSuccess,
	RemoveIngredient,
	UpdateIngredient
} from './actions';
import { ingredientsInitialState, ingredientsReducer, IngredientsState } from './reducers';

import { MockedIngredients } from '../../../../../testing/fixtures/ingredients';
import { appRootReducers, AppRootState } from '../../../core/state';

describe( '#ingredientsReducer', () => {
	let store: Store<AppRootState>;
	let state: IngredientsState;

	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				StoreModule.forRoot( appRootReducers ),
			],
		} );
		store = TestBed.get( Store );
		state = ingredientsReducer( undefined, {} as any );
	} );

	it( 'should return default state', () => {
		expect( state ).toBe( ingredientsInitialState );
	} );

	it( `${ActionTypes.LoadIngredients}: should produce state`, () => {
		expect( state.loading ).toBeFalsy();
		state = ingredientsReducer( ingredientsInitialState, new LoadIngredients() );
		expect( state.loading ).toBeTruthy();
	} );

	it( `${ActionTypes.LoadIngredientsSuccess} should produce state`, () => {
		state = ingredientsReducer( ingredientsInitialState, new LoadIngredientsSuccess( MockedIngredients ) );
		expect( state.data ).toEqual( MockedIngredients );
	} );

	it( `${ActionTypes.AddIngredient}: should produce state`, () => {
		expect( state.loading ).toBeFalsy();
		state = ingredientsReducer( ingredientsInitialState, new AddIngredient( MockedIngredients[ 0 ] ) );
		expect( state.data.length ).toEqual( 1 );
		expect( state.data[ 0 ] ).toEqual( MockedIngredients[ 0 ] );
	} );

	it( `${ActionTypes.RemoveIngredient}: should produce state`, () => {
		state = ingredientsReducer( { ...ingredientsInitialState, data: MockedIngredients },
			new RemoveIngredient( MockedIngredients[ 0 ] ) );
		expect( state.data.length ).toEqual( MockedIngredients.length - 1 );
		expect( state.data ).not.toContain( MockedIngredients[ 0 ] );
	} );

	it( `${ActionTypes.UpdateIngredient}: should produce state`, () => {
		const updatedRecord = { ...MockedIngredients[ 0 ], name: 'new name' };
		state = ingredientsReducer( { ...ingredientsInitialState, data: MockedIngredients }, new UpdateIngredient( updatedRecord ) );
		expect( state.data[ 0 ] ).toEqual( updatedRecord );
	} );
} );