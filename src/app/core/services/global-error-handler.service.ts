import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

	constructor( private injector: Injector ) { }

	public handleError( error: any ): void {
		const location = this.injector.get(LocationStrategy);
		const message = error.message ? error.message : error.toString();
		const url = location instanceof PathLocationStrategy ? location.path() : '';
		(window as any).ga('send', 'exception', {
			'exDescription': `location: ${url}||||| time: ${new Date()} ||||| message: ${message}`,
		});
		// IMPORTANT: Rethrow the error otherwise it gets swallowed
		throw error;
	}
}
