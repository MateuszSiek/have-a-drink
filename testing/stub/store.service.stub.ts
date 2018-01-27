import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { STUB_DRINKS } from '../fixtures/drinks';
import 'rxjs/add/observable/of';

@Injectable()
export class MockStoreService {
  public loadDrinks = () => {};
  public setNextDrink = () => {};
  public setPreviousDrink = () => {};
  public getCurrentDrink = () => Observable.of(STUB_DRINKS[ 0 ]);
}
