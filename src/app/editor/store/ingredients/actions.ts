import { Action } from '@ngrx/store';
import { Ingredient } from '../../../core/models/visualisation';

export enum ActionTypes {
	LoadIngredients        = '[Ingredients] Load Ingredients',
	LoadIngredientsSuccess = '[Ingredients] Load Ingredients Complete',
	AddIngredient          = '[Ingredients] Add Ingredient',
	UpdateIngredient       = '[Ingredients] Update Ingredient',
	RemoveIngredient       = '[Ingredients] Remove Ingredient',
}


export class LoadIngredients implements Action {
	public readonly type: ActionTypes.LoadIngredients = ActionTypes.LoadIngredients;

	constructor( public payload: any = null ) { }
}

export class LoadIngredientsSuccess implements Action {
	public readonly type: ActionTypes.LoadIngredientsSuccess = ActionTypes.LoadIngredientsSuccess;

	constructor( public payload: Ingredient[] ) {}
}

export class AddIngredient implements Action {
	public readonly type: ActionTypes.AddIngredient = ActionTypes.AddIngredient;

	constructor( public payload: Ingredient ) { }
}

export class UpdateIngredient implements Action {
	public readonly type: ActionTypes.UpdateIngredient = ActionTypes.UpdateIngredient;

	constructor( public payload: Ingredient ) { }
}

export class RemoveIngredient implements Action {
	public readonly type: ActionTypes.RemoveIngredient = ActionTypes.RemoveIngredient;

	constructor( public payload: Ingredient ) { }
}

export type Actions =
	| LoadIngredients
	| LoadIngredientsSuccess
	| AddIngredient
	| UpdateIngredient
	| RemoveIngredient;
