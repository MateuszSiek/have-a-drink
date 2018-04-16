import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassesListComponent } from './glasses-list.component';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { CoreModule } from '../../core/core.module';
import { DrinksListComponent } from '../drinks-list/drinks-list.component';
import { StoreService } from '../../core/services/store.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { SharedModule } from '../../shared/shared.module';
import { GlassPreviewComponent } from '../glass-preview/glass-preview.component';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { MatTableDataSource } from '@angular/material';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';

describe( 'GlassesListComponent', () => {
	let component: GlassesListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<GlassesListComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule(
			{
				imports: [
					CoreModule,
					SharedModule,
				],
				declarations: [
					GlassesListComponent,
					GlassPreviewComponent,
				],
				providers: [
					{ provide: StoreService, useClass: MockStoreService },
					{ provide: FirebaseService, useClass: MockFirebaseService },
				]
			} );
		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( GlassesListComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );


	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );

	it( 'should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll( 'mat-row' );
		expect( rows.length ).toEqual( MockedGlasses.length );
	} );

	it( 'should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll( 'mat-row' )[ 0 ];
		const firstRowViz = firstRow.querySelector( 'svg.glass-preview' );
		expect( firstRow.innerHTML ).toContain( MockedIngredients[ 0 ].name );
		expect( firstRowViz ).toBeDefined();
	} );

	it( 'should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll( 'mat-header-cell' );
		expect( columns.length ).toEqual( component.columns.length + 2 ); // +2 for add and delete columns defined by table component
	} );

	it( 'should fire edit action on click', () => {
		let glass;
		component.edit.subscribe( (d) => glass = d );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--edit-button' ).click();
		expect( glass ).toEqual( MockedGlasses[ 0 ] );
	} );

	it( 'should fire add new action on click', () => {
		let action;
		component.add.subscribe( (d) => action = d );
		fixture.nativeElement.querySelector( 'mat-header-cell .app-table--edit-button' ).click();
		expect( action ).toBeTruthy();
	} );

	it( 'should remove record on click', () => {
		const removeSpy = spyOn( store, 'removeGlass' );
		spyOn( window, 'confirm' ).and.callFake( () => true );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--remove-button' ).click();
		expect( removeSpy ).toHaveBeenCalledWith( MockedGlasses[ 0 ] );
	} );
} );
