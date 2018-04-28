import { Action } from '@ngrx/store';
import { DrinkRecipe } from '../../../core/models/visualisation';

export enum ActionTypes {
	LoadDrinks        = '[Drinks] Load Drinks',
	LoadDrinksSuccess = '[Drinks] Load Drinks Complete',
	AddDrink          = '[Drinks] Add Drink',
	UpdateDrink       = '[Drinks] Update Drink',
	RemoveDrink       = '[Drinks] Remove Drink',
}

export class LoadDrinks implements Action {
	public readonly type: ActionTypes.LoadDrinks = ActionTypes.LoadDrinks;

	constructor( public payload: any = null ) { }
}

export class LoadDrinksSuccess implements Action {
	public readonly type: ActionTypes.LoadDrinksSuccess = ActionTypes.LoadDrinksSuccess;

	constructor( public payload: DrinkRecipe[] ) {}
}

export class AddDrink implements Action {
	public readonly type: ActionTypes.AddDrink = ActionTypes.AddDrink;

	constructor( public payload: DrinkRecipe ) {}
}

export class UpdateDrink implements Action {
	public readonly type: ActionTypes.UpdateDrink = ActionTypes.UpdateDrink;

	constructor( public payload: DrinkRecipe ) { }
}

export class RemoveDrink implements Action {
	public readonly type: ActionTypes.RemoveDrink = ActionTypes.RemoveDrink;

	constructor( public payload: DrinkRecipe ) { }
}

export type Actions =
	| LoadDrinks
	| LoadDrinksSuccess
	| AddDrink
	| UpdateDrink
	| RemoveDrink;
