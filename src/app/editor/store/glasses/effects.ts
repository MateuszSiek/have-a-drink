import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { ActionTypes, AddGlass, LoadGlasses, LoadGlassesSuccess, RemoveGlass, UpdateGlass, } from './actions';
import { Glass } from '../../../core/models/visualisation';
import { FirebaseService } from '../../../core/services/firebase.service';

@Injectable()
export class GlassesEffects {

	@Effect()
	public loadGlasses$: Observable<Action> = this.actions$.pipe(
		ofType<LoadGlasses>( ActionTypes.LoadGlasses ),
		switchMap( () => this.firebaseService.getGlasses() ),
		map( (glasses: Glass[]) => new LoadGlassesSuccess( glasses ) )
	);

	@Effect( { dispatch: false } )
	public addGlass$: Observable<void> = this.actions$.pipe(
		ofType<AddGlass>( ActionTypes.AddGlass ),
		map( (action: AddGlass) => action.payload ),
		map( (glass: Glass) => this.firebaseService.addGlass( glass ) )
	);

	@Effect( { dispatch: false } )
	public updateGlass$: Observable<void> = this.actions$.pipe(
		ofType<UpdateGlass>( ActionTypes.UpdateGlass ),
		map( (action: UpdateGlass) => action.payload ),
		map( (glass: Glass) => this.firebaseService.updateGlass( glass ) )
	);

	@Effect( { dispatch: false } )
	public removeGlass$: Observable<void> = this.actions$.pipe(
		ofType<RemoveGlass>( ActionTypes.RemoveGlass ),
		map( (action: RemoveGlass) => action.payload ),
		map( (glass: Glass) => this.firebaseService.removeGlass( glass ) )
	);

	constructor(private actions$: Actions, private firebaseService: FirebaseService) {
	}
}

