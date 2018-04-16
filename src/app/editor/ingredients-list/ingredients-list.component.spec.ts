import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListComponent } from './ingredients-list.component';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { CoreModule } from '../../core/core.module';
import { StoreService } from '../../core/services/store.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { SharedModule } from '../../shared/shared.module';
import { GlassPreviewComponent } from '../glass-preview/glass-preview.component';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';

describe( 'IngredientsListComponent', () => {
	let component: IngredientsListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<IngredientsListComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule(
			{
				imports: [
					CoreModule,
					SharedModule,
				],
				declarations: [
					IngredientsListComponent,
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
		fixture = TestBed.createComponent( IngredientsListComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );


	it( 'should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll( 'mat-row' );
		expect( rows.length ).toEqual( MockedIngredients.length );
	} );

	it( 'should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll( 'mat-row' )[ 0 ];
		expect( firstRow.innerHTML ).toContain( MockedIngredients[ 0 ].name );
		expect( firstRow.innerHTML ).toContain( MockedIngredients[ 0 ].colour );
		expect( firstRow.innerHTML ).toContain( '__colour-cell' );
	} );

	it( 'should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll( 'mat-header-cell' );
		expect( columns.length ).toEqual( component.columns.length + 2 ); // +2 for add and delete columns defined by table component
	} );

	it( 'should fire edit action on click', () => {
		let ingredient;
		component.edit.subscribe( (d) => ingredient = d );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--edit-button' ).click();
		expect( ingredient ).toEqual( MockedIngredients[ 0 ] );
	} );

	it( 'should fire add new action on click', () => {
		let action;
		component.add.subscribe( (d) => action = d );
		fixture.nativeElement.querySelector( 'mat-header-cell .app-table--edit-button' ).click();
		expect( action ).toBeTruthy();
	} );

	it( 'should remove record on click', () => {
		const removeSpy = spyOn( store, 'removeIngredient' );
		spyOn( window, 'confirm' ).and.callFake( () => true );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--remove-button' ).click();
		expect( removeSpy ).toHaveBeenCalledWith( MockedIngredients[ 0 ] );
	} );
} );
