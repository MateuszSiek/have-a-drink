import { TestBed } from '@angular/core/testing';
import { IngredientsEffects } from './effects';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CoreModule } from '../../core.module';
import { StoreService } from '../../services/store.service';
import { FirebaseService } from '../../services/firebase.service';
import { AddIngredient, LoadIngredients, LoadIngredientsSuccess, RemoveIngredient, UpdateIngredient } from './actions';

import { TestActions } from '../../../../../testing/stub/test-actions';
import { MockedIngredients } from '../../../../../testing/fixtures/ingredients';
import { MockStoreService } from '../../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../../testing/stub/mocked-firebase.service';

describe( '#IngredientsEffects', () => {
	let effects: IngredientsEffects;
	let actions$: TestActions;
	let firebaseService: FirebaseService;

	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				CoreModule
			],
			providers: [
				{ provide: Actions, useFactory: () => new TestActions() },
				{ provide: StoreService, useClass: MockStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			],
		} );
		actions$ = TestBed.get( Actions );
		effects = TestBed.get( IngredientsEffects );
		firebaseService = TestBed.get( FirebaseService );
	} );

	it( '#loadIngredients$', () => {
		actions$.stream = hot( '-a', { a: new LoadIngredients() } );
		const expected = cold( '-c', { c: new LoadIngredientsSuccess( MockedIngredients ) } );
		expect( effects.loadIngredients$ ).toBeObservable( expected );
	} );

	it( '#addIngredient$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.addIngredient$.subscribe();

		spyOn( firebaseService, 'addIngredient' );
		myActions$.next( new AddIngredient( MockedIngredients[ 0 ] ) );
		expect( firebaseService.addIngredient ).toHaveBeenCalledWith( MockedIngredients[ 0 ] );
	} );

	it( '#updateIngredient$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.updateIngredient$.subscribe();

		spyOn( firebaseService, 'updateIngredient' );
		myActions$.next( new UpdateIngredient( MockedIngredients[ 1 ] ) );
		expect( firebaseService.updateIngredient ).toHaveBeenCalledWith( MockedIngredients[ 1 ] );
	} );

	it( '#removeIngredient$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.removeIngredient$.subscribe();

		spyOn( firebaseService, 'removeIngredient' );
		myActions$.next( new RemoveIngredient( MockedIngredients[ 1 ] ) );
		expect( firebaseService.removeIngredient ).toHaveBeenCalledWith( MockedIngredients[ 1 ] );
	} );
} );
