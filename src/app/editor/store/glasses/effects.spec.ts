import { TestBed } from '@angular/core/testing';
import { GlassesEffects } from './effects';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddGlass, LoadGlasses, LoadGlassesSuccess, RemoveGlass, UpdateGlass, } from './actions';

import { TestActions } from '../../../../../testing/stub/test-actions';
import { MockFirebaseService } from '../../../../../testing/stub/mocked-firebase.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { MockedGlasses } from '../../../../../testing/fixtures/glasses';
import { CoreModule } from '../../../core/core.module';

describe( '#GlassesEffects', () => {
	let effects: GlassesEffects;
	let actions$: TestActions;
	let firebaseService: FirebaseService;

	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				CoreModule
			],
			providers: [
				GlassesEffects,
				{ provide: Actions, useFactory: () => new TestActions() },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			],
		} );
		actions$ = TestBed.get( Actions );
		effects = TestBed.get( GlassesEffects );
		firebaseService = TestBed.get( FirebaseService );
	} );

	it( '#loadGlasses$', () => {
		actions$.stream = hot( '-a', { a: new LoadGlasses() } );
		const expected = cold( '-c', { c: new LoadGlassesSuccess( MockedGlasses ) } );
		expect( effects.loadGlasses$ ).toBeObservable( expected );
	} );

	it( '#addGlass$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.addGlass$.subscribe();

		spyOn( firebaseService, 'addGlass' );
		myActions$.next( new AddGlass( MockedGlasses[ 0 ] ) );
		expect( firebaseService.addGlass ).toHaveBeenCalledWith( MockedGlasses[ 0 ] );
	} );

	it( '#updateGlass$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.updateGlass$.subscribe();

		spyOn( firebaseService, 'updateGlass' );
		myActions$.next( new UpdateGlass( MockedGlasses[ 0 ] ) );
		expect( firebaseService.updateGlass ).toHaveBeenCalledWith( MockedGlasses[ 0 ] );
	} );

	it( '#removeIngredient$', () => {
		const myActions$ = new BehaviorSubject( {} );
		actions$.stream = myActions$;
		effects.removeGlass$.subscribe();

		spyOn( firebaseService, 'removeGlass' );
		myActions$.next( new RemoveGlass( MockedGlasses[ 0 ] ) );
		expect( firebaseService.removeGlass ).toHaveBeenCalledWith( MockedGlasses[ 0 ] );
	} );
} );
