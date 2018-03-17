import { Action } from '@ngrx/store';
import { DrinkRecipe } from '../models/visualisation';

export enum ActionTypes {
	Load             = '[Drinks] Load',
	LoadComplete     = '[Drinks] Load Complete',
	LoadFail         = '[Collection] Load Fail',
	SetCurrentDrink  = '[Drinks] Set current',
	SetNextDrink     = '[Drinks] Set next',
	SetPreviousDrink = '[Drinks] Set previous',
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

	constructor( public payload: any ) {}
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

export type Actions =
	| Load
	| LoadComplete
	| LoadFail
	| SetCurrentDrink
	| SetNextDrink
	| SetPreviousDrink;
