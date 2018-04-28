import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

import { TestActions } from '../../../../testing/stub/test-actions';
import { FirebaseService } from '../../core/services/firebase.service';
import { DrinksEffects } from './effects';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { CoreModule } from '../../core/core.module';
import { Load, LoadComplete, SetCurrentDrink, SetDrinkByName } from './actions';
import { RouterTestingModule } from '@angular/router/testing';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { ActivatedRoute } from '@angular/router';

describe('#DrinksEffects', () => {
	let effects: DrinksEffects;
	let actions$: TestActions;
	let firebaseService: FirebaseService;

	const getTestingModule = ( additionalProviders: any[] = [] ) => ({
		imports  : [
			CoreModule,
			RouterTestingModule
		],
		providers: [
			...additionalProviders,
			DrinksEffects,
			{ provide: Actions, useFactory: () => new TestActions() },
			{ provide: FirebaseService, useClass: MockFirebaseService },
		],
	});

	beforeEach(() => {
		TestBed.configureTestingModule(getTestingModule());
		actions$ = TestBed.get(Actions);
		effects = TestBed.get(DrinksEffects);
		firebaseService = TestBed.get(FirebaseService);
	});

	it('#loadDrinks$', () => {
		actions$.stream = hot('-a', { a: new Load() });
		const expected = cold('-c', { c: new LoadComplete(MockedDrinks) });
		expect(effects.loadDrinks$).toBeObservable(expected);
	});

	it('#setCurrentDrink$ select first drink from list', () => {
		actions$.stream = hot('-a', { a: new LoadComplete(MockedDrinks) });
		const expected = cold('-c', { c: new SetCurrentDrink(MockedDrinks[ 0 ]) });
		expect(effects.setCurrentDrink$).toBeObservable(expected);
	});

	it('#setCurrentDrink$ select first drink from list', () => {
		TestBed.resetTestingModule();
		TestBed.configureTestingModule(getTestingModule([ {
			provide: ActivatedRoute, useValue: {
				snapshot: { queryParams: { drink: 'drink name' } }
			}
		} ]));
		actions$ = TestBed.get(Actions);
		effects = TestBed.get(DrinksEffects);

		actions$.stream = hot('-a', { a: new LoadComplete(MockedDrinks) });
		const expected = cold('-c', { c: new SetDrinkByName('drink name') });
		expect(effects.setCurrentDrink$).toBeObservable(expected);
	});
});
