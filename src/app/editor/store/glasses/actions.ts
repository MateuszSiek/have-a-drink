import { Action } from '@ngrx/store';
import { Glass } from '../../../core/models/visualisation';

export enum ActionTypes {
	LoadGlasses        = '[Glasses] Load Glasses',
	LoadGlassesSuccess = '[Glasses] Load Glasses Complete',
	AddGlass           = '[Glasses] Add Glass',
	UpdateGlass        = '[Glasses] Update Glass',
	RemoveGlass        = '[Glasses] Remove Glass',
}

export class LoadGlasses implements Action {
	public readonly type: ActionTypes.LoadGlasses = ActionTypes.LoadGlasses;

	constructor( public payload: any = null ) { }
}

export class LoadGlassesSuccess implements Action {
	public readonly type: ActionTypes.LoadGlassesSuccess = ActionTypes.LoadGlassesSuccess;

	constructor( public payload: Glass[] ) {}
}

export class AddGlass implements Action {
	public readonly type: ActionTypes.AddGlass = ActionTypes.AddGlass;

	constructor( public payload: Glass ) { }
}

export class UpdateGlass implements Action {
	public readonly type: ActionTypes.UpdateGlass = ActionTypes.UpdateGlass;

	constructor( public payload: Glass ) { }
}

export class RemoveGlass implements Action {
	public readonly type: ActionTypes.RemoveGlass = ActionTypes.RemoveGlass;

	constructor( public payload: Glass ) { }
}

export type Actions =
	| LoadGlasses
	| LoadGlassesSuccess
	| AddGlass
	| UpdateGlass
	| RemoveGlass;
