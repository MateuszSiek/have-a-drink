import { mainAppInitialState, mainAppReducer, MainAppState } from '../../main-app/store/reducers';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface AppRootState {
	APP: MainAppState;
}

export const appRootReducers: ActionReducerMap<AppRootState> = {
	APP: mainAppReducer,
};

export const appRootInitialState = {
	APP: mainAppInitialState,
};

export const metaReducers: MetaReducer<AppRootState>[] = !environment.production ? [ storeFreeze ] : [];
