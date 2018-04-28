import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { StoreService } from './store.service';
import * as drinksActions from '../store/drinks/actions';
import * as ingredientsActions from '../store/ingredients/actions';
import * as glassesActions from '../store/glasses/actions';

import { appRootInitialState, appRootReducers } from '../../core/state';

import Spy = jasmine.Spy;
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { of } from 'rxjs/observable/of';
import { DrinkRecipe, Glass, Ingredient } from '../../core/models/visualisation';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';

describe('Editor StoreService', () => {
	let service: StoreService;
	let store: Store<any>;

	let select: Spy;
	let dispatch: Spy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports  : [
				StoreModule.forRoot(appRootReducers, { initialState: appRootInitialState }),
			],
			providers: [
				StoreService
			],
		});
		service = TestBed.get(StoreService);
		store = TestBed.get(Store);

		select = spyOn(store, 'select');
		dispatch = spyOn(store, 'dispatch');

	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('DRINKS', () => {
		it('#loadDrinks should dispatch action', () => {
			service.loadDrinks();
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type: drinksActions.ActionTypes.LoadDrinks
			}));
		});

		it('#getDrinks return drink', () => {
			let result: DrinkRecipe[] | undefined;
			select.and.returnValue(of(MockedDrinks));
			service.getDrinks().subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedDrinks);
		});

		it('#addDrink should dispatch action', () => {
			service.addDrink(MockedDrinks[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : drinksActions.ActionTypes.AddDrink,
				payload: MockedDrinks[ 0 ]
			}));
		});

		it('#getDrink return drink', () => {
			let result: DrinkRecipe | undefined;
			select.and.returnValue(of(MockedDrinks[ 0 ]));
			service.getDrink('').subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedDrinks[ 0 ]);
		});

		it('#updateDrink should dispatch action', () => {
			service.updateDrink(MockedDrinks[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : drinksActions.ActionTypes.UpdateDrink,
				payload: MockedDrinks[ 0 ]
			}));
		});

		it('#removeDrink should dispatch action', () => {
			service.removeDrink(MockedDrinks[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : drinksActions.ActionTypes.RemoveDrink,
				payload: MockedDrinks[ 0 ]
			}));
		});
	});

	describe('INGREDIENTS', () => {
		it('#loadIngredients should dispatch action', () => {
			service.loadIngredients();
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type: ingredientsActions.ActionTypes.LoadIngredients
			}));
		});

		it('#getIngredients return drink', () => {
			let result: Ingredient[] | undefined;
			select.and.returnValue(of(MockedIngredients));
			service.getIngredients().subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedIngredients);
		});

		it('#addIngredient should dispatch action', () => {
			service.addIngredient(MockedIngredients[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : ingredientsActions.ActionTypes.AddIngredient,
				payload: MockedIngredients[ 0 ]
			}));
		});

		it('#getIngredient return drink', () => {
			let result: Ingredient | undefined;
			select.and.returnValue(of(MockedIngredients[ 0 ]));
			service.getIngredient('').subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedIngredients[ 0 ]);
		});

		it('#updateIngredient should dispatch action', () => {
			service.updateIngredient(MockedIngredients[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : ingredientsActions.ActionTypes.UpdateIngredient,
				payload: MockedIngredients[ 0 ]
			}));
		});

		it('#removeIngredient should dispatch action', () => {
			service.removeIngredient(MockedIngredients[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : ingredientsActions.ActionTypes.RemoveIngredient,
				payload: MockedIngredients[ 0 ]
			}));
		});
	});

	describe('GLASSES', () => {
		it('#loadGlasses should dispatch action', () => {
			service.loadGlasses();
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type: glassesActions.ActionTypes.LoadGlasses
			}));
		});

		it('#getGlasses return drink', () => {
			let result: Glass[] | undefined;
			select.and.returnValue(of(MockedGlasses));
			service.getGlasses().subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedGlasses);
		});

		it('#addGlass should dispatch action', () => {
			service.addGlass(MockedGlasses[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : glassesActions.ActionTypes.AddGlass,
				payload: MockedGlasses[ 0 ]
			}));
		});

		it('#getGlass return drink', () => {
			let result: Glass | undefined;
			select.and.returnValue(of(MockedGlasses[ 0 ]));
			service.getGlass('').subscribe(res => result = res);
			expect(select).toHaveBeenCalled();
			expect(result).toEqual(MockedGlasses[ 0 ]);
		});

		it('#updateGlass should dispatch action', () => {
			service.updateGlass(MockedGlasses[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : glassesActions.ActionTypes.UpdateGlass,
				payload: MockedGlasses[ 0 ]
			}));
		});

		it('#removeGlass should dispatch action', () => {
			service.removeGlass(MockedGlasses[ 0 ]);
			expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
				type   : glassesActions.ActionTypes.RemoveGlass,
				payload: MockedGlasses[ 0 ]
			}));
		});
	});


});
