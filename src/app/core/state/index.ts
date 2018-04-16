import { mainAppInitialState, mainAppReducer, MainAppState } from '../../main-app/store/reducers';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { editorReducers, EditorState } from '../../editor/store';

export interface AppRootState {
	APP?: MainAppState;
	EDITOR?: EditorState;
}

export const appRootReducers: ActionReducerMap<AppRootState> = {};

export const appRootInitialState = {};

export const metaReducers: MetaReducer<AppRootState>[] = !environment.production ? [ storeFreeze ] : [];
