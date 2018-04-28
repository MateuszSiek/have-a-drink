import { Actions, ActionTypes } from './actions';
import { DrinkRecipe } from '../../core/models/visualisation';
import { getNextInArray, getPrevInArray } from '../../core/utils/utils';


export interface MainAppState {
	loaded: boolean;
	loading: boolean;
	loadFail: boolean;
	drinks: DrinkRecipe[];
	currentDrink?: DrinkRecipe;
}

export const mainAppInitialState: MainAppState = {
	loaded  : false,
	loading : false,
	loadFail: false,
	drinks  : []
};

export function mainAppReducer( state = mainAppInitialState, action: Actions ): MainAppState {
	switch ( action.type ) {
		case ActionTypes.Load: {
			return {
				...state,
				loading: true,
			};
		}
		case ActionTypes.LoadFail: {
			return {
				...state,
				loading : false,
				loadFail: true,
			};
		}

		case ActionTypes.LoadComplete: {
			return {
				...state,
				loaded : true,
				loading: false,
				drinks : action.payload,
			};
		}

		case ActionTypes.SetCurrentDrink: {
			return { ...state, currentDrink: action.payload, };
		}

		case ActionTypes.SetNextDrink: {
			const currentDrink = state.drinks && state.currentDrink && getNextInArray(state.drinks, state.currentDrink, 'name');
			return { ...state, currentDrink, };
		}

		case ActionTypes.SetPreviousDrink: {
			const currentDrink = state.drinks && state.currentDrink && getPrevInArray(state.drinks, state.currentDrink, 'name');
			return { ...state, currentDrink, };
		}

		case ActionTypes.SetDrinkById: {
			const currentDrink = state.drinks.find(( d: DrinkRecipe ) => d.id === action.payload) || state.drinks[ 0 ];
			return { ...state, currentDrink };
		}

		case ActionTypes.SetDrinkByName: {
			const currentDrink = state.drinks.find(( d: DrinkRecipe ) => d.name.toLowerCase() === action.payload.toLowerCase()) || state.drinks[ 0 ];

			return { ...state, currentDrink };
		}

		default:
			return state;
	}
}

