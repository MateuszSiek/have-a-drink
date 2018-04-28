import { Actions, ActionTypes, } from './actions';
import { DrinkRecipe } from '../../../core/models/visualisation';
import { removeObjectFromArray, updateObjectInArray } from '../../../core/utils/utils';

export interface DrinksState {
	loaded: boolean;
	loading: boolean;
	data: DrinkRecipe[];
}


export const drinksInitialState: DrinksState = {
	loaded : false,
	loading: false,
	data   : []
};

export function drinksReducer( state: DrinksState = drinksInitialState, action: Actions ): DrinksState {
	switch ( action.type ) {
		case ActionTypes.LoadDrinks: {
			return { ...state, loading: true, };
		}

		case ActionTypes.LoadDrinksSuccess: {
			return { ...state, loaded: true, loading: false, data: action.payload, };
		}

		case ActionTypes.AddDrink: {
			return { ...state, data: [ ...state.data, action.payload ], };
		}


		case ActionTypes.UpdateDrink: {
			return {
				...state,
				data: updateObjectInArray<DrinkRecipe>(state.data, action.payload, 'id'),
			};
		}

		case ActionTypes.RemoveDrink: {
			return {
				...state,
				data: removeObjectFromArray<DrinkRecipe>(state.data, action.payload, 'id'),
			};
		}

		default:
			return state;
	}
}
