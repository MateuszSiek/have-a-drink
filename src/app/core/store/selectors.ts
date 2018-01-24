import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { DrinkRecipe } from '../models/visualisation';
import { AppState, DrinksState } from './reducers';

export const getAppState = ( state: AppState ) => state.DRINKS;


export const getCurrentDrink: MemoizedSelector<AppState, DrinkRecipe | undefined> =
               createSelector(getAppState, ( state: DrinksState ) => state && state.currentDrink);
export const getDrinks: MemoizedSelector<AppState, DrinkRecipe[] | undefined> =
               createSelector(getAppState, ( state: DrinksState ) => state && state.drinks);

export const getCurrentDrinkName: MemoizedSelector<AppState, string | undefined> =
               createSelector(getCurrentDrink, ( state?: DrinkRecipe ) => state && state.name);
