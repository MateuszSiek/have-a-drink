import { createSelector, MemoizedSelector } from '@ngrx/store';

import { drinksInitialState, drinksReducer, DrinksState } from './drinks/reducers';
import { ingredientsInitialState, ingredientsReducer, IngredientsState } from './ingredients/reducers';
import { glassesInitialState, glassesReducer, GlassesState } from './glasses/reducers';
import { IngredientsEffects } from './ingredients/effects';
import { GlassesEffects } from './glasses/effects';
import { DrinksEffects } from './drinks/effects';
import { AppRootState } from '../../core/state';
import { DrinkRecipe, Glass, Ingredient } from '../../core/models/visualisation';


export interface EditorState {
	drinks: DrinksState;
	ingredients: IngredientsState;
	glasses: GlassesState;
}

export const editorInitialState: EditorState = {
	drinks     : drinksInitialState,
	ingredients: ingredientsInitialState,
	glasses    : glassesInitialState,
};

/*
* TODO figure out why ActionReducerMap<EditorState> is not compiling
 */
export const editorReducers: any = {
	drinks     : drinksReducer,
	ingredients: ingredientsReducer,
	glasses    : glassesReducer
};

export const effects = [ IngredientsEffects, GlassesEffects, DrinksEffects ];

/*
 * SELECTORS
 */
const getDrinksState = ( state: AppRootState ) => state.EDITOR && state.EDITOR.drinks;
const getIngredientsState = ( state: AppRootState ) => state.EDITOR && state.EDITOR.ingredients;
const getGlassesState = ( state: AppRootState ) => state.EDITOR && state.EDITOR.glasses;

export const getDrinks: MemoizedSelector<AppRootState, DrinkRecipe[]> =
	             createSelector(getDrinksState, ( state?: DrinksState ) => state && state.data || []);

export const getIngredients: MemoizedSelector<AppRootState, Ingredient[]> =
	             createSelector(getIngredientsState, ( state?: IngredientsState ) => state && state.data || []);

export const getGlasses: MemoizedSelector<AppRootState, Glass[]> =
	             createSelector(getGlassesState, ( state?: GlassesState ) => state && state.data || []);

export const getGlass: ( id: string ) => MemoizedSelector<AppRootState, Glass | undefined> =
	             ( id: string ) => createSelector(getGlasses, ( glasses: Glass[] ) => {
		             return glasses && glasses.find(glass => glass.id === id);
	             });

export const getIngredient: ( id: string ) => MemoizedSelector<AppRootState, Ingredient | undefined> =
	             ( id: string ) => createSelector(getIngredients, ( ingredients: Ingredient[] ) => {
		             return ingredients && ingredients.find(ingredient => ingredient.id === id);
	             });

export const getDrink: ( id: string ) => MemoizedSelector<AppRootState, DrinkRecipe | undefined> =
	             ( id: string ) => createSelector(getDrinks, ( drinks: DrinkRecipe[] ) => {
		             return drinks && drinks.find(drink => drink.id === id);
	             });
