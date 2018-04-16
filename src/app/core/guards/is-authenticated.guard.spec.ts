import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { FirebaseService } from '../services/firebase.service';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { StoreService } from '../services/store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

describe( 'IsAuthenticatedGuard', () => {
	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				RouterTestingModule
			],
			providers: [
				IsAuthenticatedGuard,
				{ provide: StoreService, useClass: MockStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		} );
	} );

	it( 'should ...', inject( [ IsAuthenticatedGuard ], (guard: IsAuthenticatedGuard) => {
		expect( guard ).toBeTruthy();
	} ) );
} );
