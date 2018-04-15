import { TestBed, inject } from '@angular/core/testing';

import { IngredientViewLayer, ViewData, VisualisationService } from './visualisation.service';
import { StoreService } from '../../../core/services/store.service';
import { MockStoreService } from '../../../../../testing/stub/store.service.stub';
import { STUB_DRINKS } from '../../../../../testing/fixtures/drinks';
import { Observable } from 'rxjs/Observable';

describe('VisualisationService', () => {
	let service: VisualisationService;
	let storeService: StoreService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				VisualisationService,
				{ provide: StoreService, useClass: MockStoreService }
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
		service.getViewData().subscribe(( r ) => result = r);
		const ingrTotalHeight: number = result!.drinkLayers.reduce(( a: number, i: IngredientViewLayer ) => a + i.h, 0);

		expect(result!).toBeDefined();
		expect(result!.drinkLayers.length).toEqual(STUB_DRINKS[ 0 ].ingredients.length);
		expect(result!.mask).toEqual(STUB_DRINKS[ 0 ].glass.mask);
		expect(result!.path).toEqual(STUB_DRINKS[ 0 ].glass.path);
		expect(ingrTotalHeight).toBeCloseTo(STUB_DRINKS[ 0 ].glass.maskHeight);
		expect(result!.drinkLayers[ 0 ].y).toEqual(STUB_DRINKS[ 0 ].glass.maskTopMargin);
	});

	describe('#getViewData should return undefined', () => {
		it('when current drink undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of(undefined));
			service.getViewData().subscribe(( r ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when current drinks glass undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...STUB_DRINKS[ 0 ],
				glass: undefined
			}));
			service.getViewData().subscribe(( r ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when ingredients are undefined', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...STUB_DRINKS[ 0 ],
				ingredients: undefined
			}));
			service.getViewData().subscribe(( r ) => result = r);
			expect(result).toBeUndefined();
		});

		it('when ingredients are empty', () => {
			let result: ViewData | undefined;
			spyOn(storeService, 'getCurrentDrink').and.returnValue(Observable.of({
				...STUB_DRINKS[ 0 ],
				ingredients: []
			}));
			service.getViewData().subscribe(( r ) => result = r);
			expect(result).toBeUndefined();
		});
	});
});
