import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ingredientsInitialState, ingredientsReducer, IngredientsState } from './ingredients/reducers';
import { glassesInitialState, glassesReducer, GlassesState } from './glasses/reducers';
import { drinksInitialState, drinksReducer, DrinksState } from './drinks/reducers';
import { LoadDrinksSuccess } from './drinks/actions';
import { LoadIngredientsSuccess } from './ingredients/actions';
import { LoadGlassesSuccess } from './glasses/actions';

import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { appRootInitialState, appRootReducers, AppRootState } from '../../core/state';
import {
	editorInitialState,
	editorReducers,
	getDrink,
	getDrinks,
	getGlass,
	getGlasses,
	getIngredient,
	getIngredients
} from './index';
import { DrinkRecipe, Glass, Ingredient } from '../../core/models/visualisation';
import { Actions, EffectsModule } from '@ngrx/effects';
import { TestActions } from '../../../../testing/stub/test-actions';
import { DrinksEffects } from './drinks/effects';
import { IngredientsEffects } from './ingredients/effects';
import { GlassesEffects } from './glasses/effects';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

describe('Editor State:', () => {
	let store: Store<AppRootState>;
	let ingredientsState: IngredientsState;
	let glassesState: GlassesState;
	let drinksState: DrinksState;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports  : [
				StoreModule.forRoot(appRootReducers, { initialState: appRootInitialState }),
				EffectsModule.forRoot([ DrinksEffects, IngredientsEffects, GlassesEffects ]),
				StoreModule.forFeature('EDITOR', editorReducers, { initialState: editorInitialState }),
			],
			providers: [
				DrinksEffects, IngredientsEffects, GlassesEffects,
				{ provide: Actions, useFactory: () => new TestActions() },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			],
		});
		store = TestBed.get(Store);
	});

	describe('default state', () => {
		it('#ingredientsReducer should return default state', () => {
			ingredientsState = ingredientsReducer(undefined, {} as any);
			expect(ingredientsState).toBe(ingredientsInitialState);
		});
		it('#glassesReducer should return default state', () => {
			glassesState = glassesReducer(undefined, {} as any);
			expect(glassesState).toBe(glassesInitialState);
		});
		it('#drinksReducer should return default state', () => {
			drinksState = drinksReducer(undefined, {} as any);
			expect(drinksState).toBe(drinksInitialState);
		});
	});

	describe('selectors should return data', () => {
		it(`#getDrinks selector`, () => {
			let drinks: DrinkRecipe[] | undefined;
			store.select(getDrinks).subscribe(d => drinks = d);
			store.dispatch(new LoadDrinksSuccess(MockedDrinks));
			expect(drinks).toEqual(MockedDrinks);
		});
		it(`#getIngredients selector`, () => {
			let ingredients: Ingredient[] | undefined;
			store.select(getIngredients).subscribe(d => ingredients = d);
			store.dispatch(new LoadIngredientsSuccess(MockedIngredients));
			expect(ingredients).toEqual(MockedIngredients);
		});
		it(`#getGlasses selector`, () => {
			let glasses: Glass[] | undefined;
			store.select(getGlasses).subscribe(d => glasses = d);
			store.dispatch(new LoadGlassesSuccess(MockedGlasses));
			expect(glasses).toEqual(MockedGlasses);
		});

		it(`#getDrink selector`, () => {
			let drink: DrinkRecipe | undefined;
			store.select(getDrink(MockedDrinks[ 1 ].id as string)).subscribe(d => drink = d);
			store.dispatch(new LoadDrinksSuccess(MockedDrinks));
			expect(drink).toEqual(MockedDrinks[ 1 ]);
		});

		it(`#getIngredient selector`, () => {
			let ingredient: Ingredient | undefined;
			store.select(getIngredient(MockedIngredients[ 1 ].id as string)).subscribe(d => ingredient = d);
			store.dispatch(new LoadIngredientsSuccess(MockedIngredients));
			expect(ingredient).toEqual(MockedIngredients[ 1 ]);
		});

		it(`#getGlass selector`, () => {
			let glass: Glass | undefined;
			store.select(getGlass(MockedGlasses[ 0 ].id as string)).subscribe(d => glass = d);
			store.dispatch(new LoadGlassesSuccess(MockedGlasses));
			expect(glass).toEqual(MockedGlasses[ 0 ]);
		});
	});
});
