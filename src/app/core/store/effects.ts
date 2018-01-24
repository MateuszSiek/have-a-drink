import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Actions, ActionTypes, LoadComplete, SetCurrentDrink } from './actions';
import { DRINKS } from '../data/drinks';

@Injectable()
export class DrinksEffects {

  @Effect()
  public loadDrinks$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Load),
    map(() => new LoadComplete(DRINKS))
  );

  @Effect()
  public setCurrentDrink$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadComplete),
    map(( action: LoadComplete ) => new SetCurrentDrink(action.payload[ 0 ]))
  );

  constructor( private actions$: Actions ) {}
}

