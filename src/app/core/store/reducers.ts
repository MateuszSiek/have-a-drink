import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { DrinkRecipe } from '../models/visualisation';
import { Actions, ActionTypes, LoadComplete, SetCurrentDrink } from './actions';
import { getNextInArray, getPrevInArray } from '../utils/utils';
import { environment } from '../../../environments/environment';


export interface AppState {
	DRINKS: DrinksState;
}

export interface DrinksState {
	loaded: boolean;
	loading: boolean;
	drinks: DrinkRecipe[];
	currentDrink?: DrinkRecipe;
}

export const initialState: DrinksState = {
	loaded : false,
	loading: false,
	drinks : []
};

export function reducer( state = initialState, action: Actions ): DrinksState {
	switch ( action.type ) {
		case ActionTypes.Load: {
			return {
				...state,
				loading: true,
			};
		}

		case ActionTypes.LoadComplete: {
			return {
				loaded : true,
				loading: false,
				drinks : action.payload,
			};
		}

		case ActionTypes.SetCurrentDrink: {
			return { ...state, currentDrink: action.payload, };
		}

		case ActionTypes.SetNextDrink: {
			const nextDrink = state.drinks && state.currentDrink && getNextInArray(state.drinks, state.currentDrink, 'name');
			if ( !nextDrink ) { return { ...state }; }
			return { ...state, currentDrink: nextDrink, };
		}

		case ActionTypes.SetPreviousDrink: {
			const prevDrink = state.drinks && state.currentDrink && getPrevInArray(state.drinks, state.currentDrink, 'name');
			if ( !prevDrink ) { return { ...state }; }
			return { ...state, currentDrink: prevDrink, };
		}

		case ActionTypes.SetDrinkById: {
			const drink = state.drinks.find(( d: DrinkRecipe ) => d.id === action.payload) || state.drinks[ 0 ];
			return { ...state, currentDrink: drink, };
		}

		case ActionTypes.SetDrinkByName: {
			const drink = state.drinks.find(( d: DrinkRecipe ) => d.name.toLowerCase() === action.payload.toLowerCase()) || state.drinks[ 0 ];

			return { ...state, currentDrink: drink, };
		}

		default:
			return state;
	}
}

export const reducers: ActionReducerMap<AppState> = { DRINKS: reducer };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [ storeFreeze ] : [];
