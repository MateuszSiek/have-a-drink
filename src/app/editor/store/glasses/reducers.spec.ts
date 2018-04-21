import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ActionTypes, AddGlass, LoadGlasses, LoadGlassesSuccess, RemoveGlass, UpdateGlass } from './actions';
import { glassesInitialState, glassesReducer, GlassesState } from './reducers';

import { MockedGlasses } from '../../../../../testing/fixtures/glasses';
import { appRootReducers, AppRootState } from '../../../core/state';

describe( '#glassesReducer', () => {
	let store: Store<AppRootState>;
	let state: GlassesState;

	beforeEach( () => {
		TestBed.configureTestingModule( {
			imports: [
				StoreModule.forRoot( appRootReducers ),
			],
		} );
		store = TestBed.get( Store );
		state = glassesReducer( undefined, {} as any );
	} );

	it( 'should return default state', () => {
		expect( state ).toBe( glassesInitialState );
	} );

	it( `${ActionTypes.LoadGlasses}: should produce state`, () => {
		expect( state.loading ).toBeFalsy();
		state = glassesReducer( glassesInitialState, new LoadGlasses() );
		expect( state.loading ).toBeTruthy();
	} );

	it( `${ActionTypes.LoadGlassesSuccess} should produce state`, () => {
		state = glassesReducer( glassesInitialState, new LoadGlassesSuccess( MockedGlasses ) );
		expect( state.data ).toEqual( MockedGlasses );
	} );

	it( `${ActionTypes.AddGlass}: should produce state`, () => {
		expect( state.loading ).toBeFalsy();
		state = glassesReducer( glassesInitialState, new AddGlass( MockedGlasses[ 0 ] ) );
		expect( state.data.length ).toEqual( 1 );
		expect( state.data[ 0 ] ).toEqual( MockedGlasses[ 0 ] );
	} );

	it( `${ActionTypes.RemoveGlass}: should produce state`, () => {
		state = glassesReducer( { ...glassesInitialState, data: MockedGlasses }, new RemoveGlass( MockedGlasses[ 0 ] ) );
		expect( state.data.length ).toEqual( MockedGlasses.length - 1 );
		expect( state.data ).not.toContain( MockedGlasses[ 0 ] );
	} );

	it( `${ActionTypes.UpdateGlass}: should produce state`, () => {
		const updatedRecord = { ...MockedGlasses[ 0 ], name: 'new name' };
		state = glassesReducer( { ...glassesInitialState, data: MockedGlasses }, new UpdateGlass( updatedRecord ) );
		expect( state.data[ 0 ] ).toEqual( updatedRecord );
	} );
} );