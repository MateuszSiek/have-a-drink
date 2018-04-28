import { createSelector, MemoizedSelector } from '@ngrx/store';

import { DrinkRecipe } from '../../core/models/visualisation';
import { AppRootState } from '../../core/state';
import { MainAppState } from './reducers';

export const getState = ( state: AppRootState ) => state.APP;

export const getCurrentDrink: MemoizedSelector<AppRootState, DrinkRecipe | undefined> =
	             createSelector(getState, ( state?: MainAppState ) => state && state.currentDrink);

export const getDrinks: MemoizedSelector<AppRootState, DrinkRecipe[]> =
	             createSelector(getState, ( state?: MainAppState ) => state && state.drinks || []);

export const getCurrentDrinkName: MemoizedSelector<AppRootState, string | undefined> =
	             createSelector(getCurrentDrink, ( state?: DrinkRecipe ) => state && state.name);
