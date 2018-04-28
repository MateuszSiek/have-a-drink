import { Action } from '@ngrx/store';
import { DrinkRecipe } from '../../core/models/visualisation';

export enum ActionTypes {
	Load             = '[Drinks] Load',
	LoadComplete     = '[Drinks] Load Complete',
	LoadFail         = '[Drinks] Load Fail',
	SetCurrentDrink  = '[Drinks] Set current',
	SetNextDrink     = '[Drinks] Set next',
	SetPreviousDrink = '[Drinks] Set previous',
	SetDrinkById     = '[Drinks] Set drink by id',
	SetDrinkByName   = '[Drinks] Set drink by name',
}

export class Load implements Action {
	public readonly type: ActionTypes.Load = ActionTypes.Load;

	constructor( public payload: any = null ) { }
}

export class LoadComplete implements Action {
	public readonly type: ActionTypes.LoadComplete = ActionTypes.LoadComplete;

	constructor( public payload: DrinkRecipe[] ) {}
}

export class LoadFail implements Action {
	public readonly type: ActionTypes.LoadFail = ActionTypes.LoadFail;

	constructor( public payload: any = null ) {}
}


export class SetCurrentDrink implements Action {
	public readonly type: ActionTypes.SetCurrentDrink = ActionTypes.SetCurrentDrink;

	constructor( public payload: DrinkRecipe ) {}
}

export class SetNextDrink implements Action {
	public readonly type: ActionTypes.SetNextDrink = ActionTypes.SetNextDrink;

	constructor( public payload: any = null ) { }
}

export class SetPreviousDrink implements Action {
	public readonly type: ActionTypes.SetPreviousDrink = ActionTypes.SetPreviousDrink;

	constructor( public payload: any = null ) { }
}

export class SetDrinkById implements Action {
	public readonly type: ActionTypes.SetDrinkById = ActionTypes.SetDrinkById;

	constructor( public payload: string ) { }
}

export class SetDrinkByName implements Action {
	public readonly type: ActionTypes.SetDrinkByName = ActionTypes.SetDrinkByName;

	constructor( public payload: string ) { }
}

export type Actions =
	| Load
	| LoadComplete
	| LoadFail
	| SetCurrentDrink
	| SetNextDrink
	| SetPreviousDrink
	| SetDrinkById
	| SetDrinkByName;
