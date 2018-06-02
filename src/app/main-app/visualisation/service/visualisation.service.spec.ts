import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MockMainAppStoreService } from '../../../../../testing/stub/main-app-store.service';
import { MockedDrinks } from '../../../../../testing/fixtures/drinks';

import { IngredientViewLayer, ViewData, VisualisationService } from './visualisation.service';
import { StoreService } from '../../services/store.service';

describe('VisualisationService', () => {
	let service: VisualisationService;
	let storeService: StoreService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				VisualisationService,
				{ provide: StoreService, useClass: MockMainAppStoreService }
			]
		});
	});

	beforeEach(() => {
		service = TestBed.get(VisualisationService);
		storeService = TestBed.get(StoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#getViewData should return view data', () => {
		let result: ViewData | undefined;
		service.getViewData().subscribe(( r: any ) => result = r);
		const ingrTotalHeight: number = (result as ViewData).drinkLayers.reduce(( a: number, i: IngredientViewLayer ) => a + i.h, 0);

		expect(result).toBeDefined();
		expect(result && result.drinkLayers.length).toEqual(MockedDrinks[ 0 ]!.ingredients.length);
		expect(result && result.mask).toEqual(MockedDrinks[ 0 ]!.glass!.mask);
		expect(result && result.path).toEqual(MockedDrinks[ 0 ]!.glass!.path);
	});

	it('#getViewData should return undefined', ( done ) => {
		service.getAllDrinks().subscribe(r => {
			expect(r).toEqual(MockedDrinks);
			done();
		});
	});

	describe('#getViewData should return undefined', () => {
		it('when current drink undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of(undefined));
			service.getViewData().subscribe(( r: ViewData | undefined ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when current drinks glass undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...MockedDrinks[ 0 ],
				glass: undefined
			}));
			service.getViewData().subscribe(( r: ViewData | undefined ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when ingredients are undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...MockedDrinks[ 0 ],
				ingredients: undefined
			}));
			service.getViewData().subscribe(( r ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when ingredients are empty', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...MockedDrinks[ 0 ],
				ingredients: []
			}));
			service.getViewData().subscribe(( r: ViewData | undefined ) => result = r);
			expect(result).toBeUndefined();
		});
	});
});
