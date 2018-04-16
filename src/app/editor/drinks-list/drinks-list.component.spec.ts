import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksListComponent } from './drinks-list.component';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { CoreModule } from '../../core/core.module';
import { AddDrinkComponent } from '../add-drink/add-drink.component';
import { StoreService } from '../../core/services/store.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GlassPreviewComponent } from '../glass-preview/glass-preview.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';

describe( 'DrinksListComponent', () => {
	let component: DrinksListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<DrinksListComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule(
			{
				imports: [
					CoreModule,
					SharedModule,
				],
				declarations: [
					DrinksListComponent,
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
		fixture = TestBed.createComponent( DrinksListComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );

	it( 'should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll( 'mat-row' );
		expect( rows.length ).toEqual( MockedDrinks.length );
	} );

	it( 'should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll( 'mat-row' )[ 0 ];
		const firstRowViz = firstRow.querySelector( 'svg.glass-preview' );
		expect( firstRow.innerHTML ).toContain( MockedDrinks[ 0 ].name );
		expect( firstRow.innerHTML ).toContain( MockedIngredients[ 0 ].name );
		expect( firstRow.innerHTML ).toContain( MockedIngredients[ 1 ].name );
		expect( firstRowViz ).toBeDefined();
	} );

	it( 'should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll( 'mat-header-cell' );
		expect( columns.length ).toEqual( component.columns.length + 2 ); // +2 for add and delete columns defined by table component
	} );

	it( 'should fire edit action on click', () => {
		let recipe;
		component.edit.subscribe( (d) => recipe = d );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--edit-button' ).click();
		expect( recipe ).toEqual( MockedDrinks[ 0 ] );
	} );

	it( 'should fire add new action on click', () => {
		let action;
		component.add.subscribe( (d) => action = d );
		fixture.nativeElement.querySelector( 'mat-header-cell .app-table--edit-button' ).click();
		expect( action ).toBeTruthy();
	} );

	it( 'should remove record on click', () => {
		const removeDrinkSpy = spyOn( store, 'removeDrink' );
		spyOn( window, 'confirm' ).and.callFake( () => true );
		fixture.nativeElement.querySelector( 'mat-cell .app-table--remove-button' ).click();
		expect( removeDrinkSpy ).toHaveBeenCalledWith( MockedDrinks[ 0 ] );
	} );
} );
