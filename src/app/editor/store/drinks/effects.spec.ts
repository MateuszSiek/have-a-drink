import { TestBed } from '@angular/core/testing';
import { DrinksEffects } from './effects';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AddDrink, LoadDrinks, LoadDrinksSuccess, RemoveDrink, UpdateDrink } from './actions';

import { MockFirebaseService } from '../../../../../testing/stub/mocked-firebase.service';
import { TestActions } from '../../../../../testing/stub/test-actions';
import { FirebaseService } from '../../../core/services/firebase.service';
import { MockedDrinks } from '../../../../../testing/fixtures/drinks';
import { CoreModule } from '../../../core/core.module';

describe('#DrinksEffects', () => {
	let effects: DrinksEffects;
	let actions$: TestActions;
	let firebaseService: FirebaseService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports  : [
				CoreModule
			],
			providers: [
				DrinksEffects,
				{ provide: Actions, useFactory: () => new TestActions() },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			],
		});
		actions$ = TestBed.get(Actions);
		effects = TestBed.get(DrinksEffects);
		firebaseService = TestBed.get(FirebaseService);
	});

	it('#loadDrinks$', () => {
		actions$.stream = hot('-a', { a: new LoadDrinks() });
		const expected = cold('-c', { c: new LoadDrinksSuccess(MockedDrinks) });
		expect(effects.loadDrinks$).toBeObservable(expected);
	});

	it('#addDrink$', () => {
		const myActions$ = new BehaviorSubject({});
		actions$.stream = myActions$;
		effects.addDrink$.subscribe();

		spyOn(firebaseService, 'addDrink');
		myActions$.next(new AddDrink(MockedDrinks[ 0 ]));
		expect(firebaseService.addDrink).toHaveBeenCalledWith(MockedDrinks[ 0 ]);
	});

	it('#updateDrink$', () => {
		const myActions$ = new BehaviorSubject({});
		actions$.stream = myActions$;
		effects.updateDrink$.subscribe();

		spyOn(firebaseService, 'updateDrink');
		myActions$.next(new UpdateDrink(MockedDrinks[ 0 ]));
		expect(firebaseService.updateDrink).toHaveBeenCalledWith(MockedDrinks[ 0 ]);
	});

	it('#removeIngredient$', () => {
		const myActions$ = new BehaviorSubject({});
		actions$.stream = myActions$;
		effects.removeDrink$.subscribe();

		spyOn(firebaseService, 'removeDrink');
		myActions$.next(new RemoveDrink(MockedDrinks[ 0 ]));
		expect(firebaseService.removeDrink).toHaveBeenCalledWith(MockedDrinks[ 0 ]);
	});
});
