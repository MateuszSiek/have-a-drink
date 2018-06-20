import { ErrorHandler, Injectable, InjectionToken, Injector } from '@angular/core';
import * as Rollbar from 'rollbar';
import { environment } from '../../../environments/environment';


export function rollbarFactory(): any {
	return new Rollbar(environment.rollbar);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

	constructor( private injector: Injector ) { }

	public handleError( error: any ): void {
		const rollbar = this.injector.get(RollbarService);
		rollbar.error(error.originalError || error);
		// IMPORTANT: Rethrow the error otherwise it gets swallowed
		throw error;
	}
}
