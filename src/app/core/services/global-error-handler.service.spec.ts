import { TestBed, inject } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { LocationStrategy } from '@angular/common';

describe('GlobalErrorHandlerService', () => {
	let service: GlobalErrorHandlerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ GlobalErrorHandlerService, LocationStrategy ]
		});
		service = TestBed.get(GlobalErrorHandlerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should re-throw errors', () => {
		expect(() => service.handleError(new Error())).toThrowError();
	});

});
