import {
  ErrorHandler,
  Injectable,
  InjectionToken,
  Injector
} from "@angular/core";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  public handleError(error: any): void {
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }
}
