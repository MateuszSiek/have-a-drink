import { Actions, ActionTypes, } from './actions';
import { Glass } from '../../../core/models/visualisation';
import { removeObjectFromArray, updateObjectInArray } from '../../../core/utils/utils';


export interface GlassesState {
	loaded: boolean;
	loading: boolean;
	data: Glass[];
}

export const glassesInitialState: GlassesState = {
	loaded: false,
	loading: false,
	data: [],
};

export function glassesReducer(state: GlassesState = glassesInitialState, action: Actions): GlassesState {
	switch ( action.type ) {
		case ActionTypes.LoadGlasses: {
			return { ...state, loading: true, };
		}

		case ActionTypes.LoadGlassesSuccess: {
			return { ...state, loaded: true, loading: false, data: action.payload, };
		}

		case ActionTypes.AddGlass: {
			return { ...state, data: [ ...state.data, action.payload ], };
		}

		case ActionTypes.UpdateGlass: {
			return {
				...state,
				data: updateObjectInArray<Glass>( state.data, action.payload, 'id' ),
			};
		}

		case ActionTypes.RemoveGlass: {
			return {
				...state,
				data: removeObjectFromArray<Glass>( state.data, action.payload, 'id' ),
			};
		}

		default:
			return state;
	}
}