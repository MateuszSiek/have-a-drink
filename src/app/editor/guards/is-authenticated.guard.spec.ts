import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'firebase';
import { of } from 'rxjs/observable/of';

import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { FirebaseService } from '../../core/services/firebase.service';

describe('IsAuthenticatedGuard', () => {
	let firebaseService: FirebaseService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports  : [
				RouterTestingModule
			],
			providers: [
				IsAuthenticatedGuard,
				{ provide: FirebaseService, useClass: MockFirebaseService },
			]
		});
		firebaseService = TestBed.get(FirebaseService);
	});

	it('should ...', inject([ IsAuthenticatedGuard ], ( guard: IsAuthenticatedGuard ) => {
		expect(guard).toBeTruthy();
	}));

	it('should return true if user logged in', inject([ IsAuthenticatedGuard ], ( guard: IsAuthenticatedGuard ) => {
		spyOn(firebaseService, 'getAuthState').and.returnValue(of({} as User));
		let canActivate: boolean | undefined;
		guard.canActivate().subscribe((res => canActivate = res));
		expect(canActivate).toBe(true);
	}));

	it('should return false if user logged in', inject([ IsAuthenticatedGuard ], ( guard: IsAuthenticatedGuard ) => {
		spyOn(firebaseService, 'getAuthState').and.returnValue(of(undefined));
		let canActivate: boolean | undefined;
		guard.canActivate().subscribe(res => canActivate = res);
		expect(canActivate).toBe(false);
	}));

});
