import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsAnonymousGuard } from './is-anonymous.guard';
import { FirebaseService } from '../services/firebase.service';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { StoreService } from '../services/store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

describe( 'IsAnonymousGuard', () => {
	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				RouterTestingModule
			],
			providers: [
				IsAnonymousGuard,
				{ provide: StoreService, useClass: MockStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		} );
	} );

	it( 'should ...', inject( [ IsAnonymousGuard ], (guard: IsAnonymousGuard) => {
		expect( guard ).toBeTruthy();
	} ) );
} );
