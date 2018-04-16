import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AppState, getDrink, getDrinks, getGlass, getGlasses, getIngredient, getIngredients, metaReducers, reducers } from './index';
import { ingredientsInitialState, ingredientsReducer, IngredientsState } from './ingredients/reducers';
import { glassesInitialState, glassesReducer, GlassesState } from './glasses/reducers';
import { drinksInitialState, drinksReducer, DrinksState } from './drinks/reducers';
import { LoadDrinksSuccess } from './drinks/actions';
import { LoadIngredientsSuccess } from './ingredients/actions';
import { LoadGlassesSuccess } from './glasses/actions';

import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';

describe( 'App State:', () => {
	let store: Store<AppState>;
	let state: AppState;
	let ingredientsState: IngredientsState;
	let glassesState: GlassesState;
	let drinksState: DrinksState;

	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				StoreModule.forRoot( reducers, { metaReducers } ),
			],
		} );
		store = TestBed.get( Store );
	} );

	describe( 'default state', () => {
		it( '#ingredientsReducer should return default state', () => {
			ingredientsState = ingredientsReducer( undefined, {} as any );
			expect( ingredientsState ).toBe( ingredientsInitialState );
		} );
		it( '#glassesReducer should return default state', () => {
			glassesState = glassesReducer( undefined, {} as any );
			expect( glassesState ).toBe( glassesInitialState );
		} );
		it( '#drinksReducer should return default state', () => {
			drinksState = drinksReducer( undefined, {} as any );
			expect( drinksState ).toBe( drinksInitialState );
		} );
	} );

	describe( 'selectors should return data', () => {
		it( `#getDrinks selector`, () => {
			let drinks;
			store.dispatch( new LoadDrinksSuccess( MockedDrinks ) );
			store.select( getDrinks ).subscribe( d => drinks = d );
			expect( drinks ).toEqual( MockedDrinks );
		} );
		it( `#getIngredients selector`, () => {
			let ingredients;
			store.dispatch( new LoadIngredientsSuccess( MockedIngredients ) );
			store.select( getIngredients ).subscribe( d => ingredients = d );
			expect( ingredients ).toEqual( MockedIngredients );
		} );
		it( `#getGlasses selector`, () => {
			let glasses;
			store.dispatch( new LoadGlassesSuccess( MockedGlasses ) );
			store.select( getGlasses ).subscribe( d => glasses = d );
			expect( glasses ).toEqual( MockedGlasses );
		} );

		it( `#getDrink selector`, () => {
			let drink;
			store.dispatch( new LoadDrinksSuccess( MockedDrinks ) );
			store.select( getDrink( MockedDrinks[ 1 ].id ) ).subscribe( d => drink = d );
			expect( drink ).toEqual( MockedDrinks[ 1 ] );
		} );

		it( `#getIngredient selector`, () => {
			let ingredient;
			store.dispatch( new LoadIngredientsSuccess( MockedIngredients ) );
			store.select( getIngredient( MockedIngredients[ 1 ].id ) ).subscribe( d => ingredient = d );
			expect( ingredient ).toEqual( MockedIngredients[ 1 ] );
		} );

		it( `#getGlass selector`, () => {
			let glass;
			store.dispatch( new LoadGlassesSuccess( MockedGlasses ) );
			store.select( getGlass( MockedGlasses[ 0 ].id ) ).subscribe( d => glass = d );
			expect( glass ).toEqual( MockedGlasses[ 0 ] );
		} );
	} );
} );