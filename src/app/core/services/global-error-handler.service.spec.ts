import { TestBed, inject } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { LocationStrategy } from '@angular/common';

describe('GlobalErrorHandlerService', () => {
	let service: GlobalErrorHandlerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ GlobalErrorHandlerService, LocationStrategy ]
		});
		spyOn(window as any, 'ga');
		service = TestBed.get(GlobalErrorHandlerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should dispatch error to analytics', ( done ) => {
		try {
			service.handleError('test error');
		}
		catch ( error ) {
			expect((window as any).ga).toHaveBeenCalled();
			done();
		}
	});

	it('should re-throw errors', () => {
		expect(() => service.handleError(new Error())).toThrowError();
	});

});
