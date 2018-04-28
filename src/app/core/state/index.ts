import { mainAppInitialState, mainAppReducer, MainAppState } from '../../main-app/store/reducers';
import { storeFreeze } from 'ngrx-store-freeze';
import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { editorInitialState, editorReducers, EditorState } from '../../editor/store';

export interface AppRootState {
	APP: MainAppState;
	EDITOR: EditorState;
}

/*
 * TODO figure out why ActionReducerMap<EditorState> is not compiling
 */
export const appRootReducers: any = {
	APP: mainAppReducer,
	EDITOR: editorReducers
};

export const appRootInitialState = {
	APP: mainAppInitialState,
	EDITOR: editorInitialState
};

export const metaReducers: MetaReducer<AppRootState>[] = !environment.production ? [ storeFreeze ] : [];
