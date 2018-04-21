import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { FirebaseService } from '../services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

describe( 'IsAuthenticatedGuard', () => {
	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				RouterTestingModule
			],
			providers: [
				IsAuthenticatedGuard,
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		} );
	} );

	it( 'should ...', inject( [ IsAuthenticatedGuard ], (guard: IsAuthenticatedGuard) => {
		expect( guard ).toBeTruthy();
	} ) );
} );
