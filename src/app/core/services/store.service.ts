import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/reducers';
import { getCurrentDrink } from '../store/selectors';
import { DrinkRecipe } from '../models/visualisation';
import * as actions from '../store/actions';


@Injectable()
export class StoreService {

  constructor( private store: Store<AppState>, ) {
  }

  public loadDrinks(): void {
    this.store.dispatch(new actions.Load());
  }

  public setNextDrink(): void {
    this.store.dispatch(new actions.SetNextDrink());
  }

  public setPreviousDrink(): void {
    this.store.dispatch(new actions.SetPreviousDrink());
  }

  public getCurrentDrink(): Observable<DrinkRecipe | undefined> {
    return this.store.select(getCurrentDrink);
  }
}