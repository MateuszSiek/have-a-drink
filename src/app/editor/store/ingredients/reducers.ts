import { Actions, ActionTypes, } from './actions';
import { Ingredient } from '../../../core/models/visualisation';
import { removeObjectFromArray, updateObjectInArray } from '../../../core/utils/utils';


export interface IngredientsState {
	loaded: boolean;
	loading: boolean;
	data: Ingredient[];
}


export const ingredientsInitialState: IngredientsState = {
	loaded : false,
	loading: false,
	data   : [],
};

export function ingredientsReducer( state: IngredientsState = ingredientsInitialState, action: Actions ): IngredientsState {
	switch ( action.type ) {
		case ActionTypes.LoadIngredients : {
			return { ...state, loading: true, };
		}

		case ActionTypes.LoadIngredientsSuccess: {
			return { ...state, loaded: true, loading: false, data: action.payload, };
		}

		case ActionTypes.AddIngredient: {
			return { ...state, data: [ ...state.data, action.payload ], };
		}

		case ActionTypes.UpdateIngredient: {
			return {
				...state,
				data: updateObjectInArray<Ingredient>(state.data, action.payload, 'id'),
			};
		}

		case ActionTypes.RemoveIngredient: {
			return {
				...state,
				data: removeObjectFromArray<Ingredient>(state.data, action.payload, 'id'),
			};
		}
		default:
			return state;
	}
}