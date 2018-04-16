import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddDrinkComponent } from './add-drink.component';
import { StoreService } from '../../core/services/store.service';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { SharedModule } from '../../shared/shared.module';


describe( 'AddDrinkComponent', () => {
	let component: AddDrinkComponent;
	let fixture: ComponentFixture<AddDrinkComponent>;
	let store: StoreService;

	beforeEach( async( () => {
		TestBed.configureTestingModule(
			{
				imports: [
					SharedModule,
					NoopAnimationsModule
				],
				declarations: [ AddDrinkComponent ],
				providers: [
					{ provide: StoreService, useClass: MockStoreService },
					{ provide: FirebaseService, useClass: MockFirebaseService },
					{ provide: MatDialogRef, useValue: { close: () => undefined } },
					{ provide: MAT_DIALOG_DATA, useValue: {} },
				]
			} );
		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( AddDrinkComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		component.data = MockedDrinks[ 0 ];
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );

	it( 'should set form fields', () => {
		const formValue = component.form.value;
		expect( formValue.id ).toEqual( MockedDrinks[ 0 ].id );
		expect( formValue.active ).toEqual( MockedDrinks[ 0 ].active );
		expect( formValue.name ).toEqual( MockedDrinks[ 0 ].name );
		expect( formValue.glass ).toEqual( MockedDrinks[ 0 ].glass );
		expect( formValue.ingredients.length ).toEqual( MockedDrinks[ 0 ].ingredients.length );
	} );


	it( 'should save drink', () => {
		const updateSpy = spyOn( store, 'updateDrink' );
		component.saveDrink();
		expect( updateSpy ).toHaveBeenCalledWith( MockedDrinks[ 0 ] );
	} );


	it( 'should create new drink', () => {
		const newDrink = { ...MockedDrinks[ 0 ], id: null };
		const addSpy = spyOn( store, 'addDrink' );
		component.data = newDrink;
		component.ngOnInit();
		fixture.detectChanges();
		component.saveDrink();
		expect( addSpy ).toHaveBeenCalledWith( newDrink );
	} );
} );
