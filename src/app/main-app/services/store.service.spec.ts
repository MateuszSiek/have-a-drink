import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import Spy = jasmine.Spy;
import { of } from 'rxjs/observable/of';

import { StoreService } from './store.service';
import * as actions from '../store/actions';

import { MockedDrinks } from '../../../../testing/fixtures/drinks';

import { appRootInitialState, appRootReducers } from '../../core/state';
import { DrinkRecipe } from '../../core/models/visualisation';

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

	it('#loadDrinks should dispatch action', () => {
		service.loadDrinks();
		expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
			type: actions.ActionTypes.Load
		}));
	});

	it('#setNextDrink should dispatch action', () => {
		service.setNextDrink();
		expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
			type: actions.ActionTypes.SetNextDrink
		}));
	});

	it('#setPreviousDrink should dispatch action', () => {
		service.setPreviousDrink();
		expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
			type: actions.ActionTypes.SetPreviousDrink
		}));
	});


	it('#setCurrentDrinkById should dispatch action', () => {
		service.setCurrentDrinkById('id');
		expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
			type   : actions.ActionTypes.SetDrinkById,
			payload: 'id'
		}));
	});

	it('#setCurrentDrinkByName should dispatch action', () => {
		service.setCurrentDrinkByName('name');
		expect(dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
			type   : actions.ActionTypes.SetDrinkByName,
			payload: 'name'
		}));
	});

	it('#getCurrentDrink should return current drink', () => {
		let result: DrinkRecipe | undefined;
		select.and.returnValue(of(MockedDrinks[0]));
		service.getCurrentDrink().subscribe(( res: DrinkRecipe | undefined ) => result = res);
		expect(select).toHaveBeenCalled();
		expect(result).toEqual(MockedDrinks[0]);
	});

	it('#getAllDrinks should return all drinks', () => {
		let result: DrinkRecipe[] | undefined;
		select.and.returnValue(of(MockedDrinks));
		service.getAllDrinks().subscribe(res => result = res);
		expect(select).toHaveBeenCalled();
		expect(result).toEqual(MockedDrinks);
	});
});
