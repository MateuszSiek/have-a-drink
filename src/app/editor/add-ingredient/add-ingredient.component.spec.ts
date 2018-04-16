import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AddIngredientComponent } from './add-ingredient.component';
import { MockStoreService } from '../../../../testing/stub/mock-store.service';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { StoreService } from '../../core/services/store.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { SharedModule } from '../../shared/shared.module';

describe( 'AddIngredientComponent', () => {
	let component: AddIngredientComponent;
	let fixture: ComponentFixture<AddIngredientComponent>;
	let store: StoreService;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [
				SharedModule,
				NoopAnimationsModule
			],
			declarations: [ AddIngredientComponent ],
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
		fixture = TestBed.createComponent( AddIngredientComponent );
		store = TestBed.get( StoreService );
		component = fixture.componentInstance;
		component.data = MockedIngredients[ 0 ];
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );


	it( 'should render ingredient fields with data', () => {
		const nameInput = fixture.nativeElement.querySelector( 'input[formControlName=name]' );
		const colorInput = fixture.nativeElement.querySelector( 'input[formControlName=colour]' );
		expect( nameInput.value ).toEqual( MockedIngredients[ 0 ].name );
		expect( colorInput.value ).toEqual( MockedIngredients[ 0 ].colour );
	} );

	it( 'should save ingredient', () => {
		const updateSpy = spyOn( store, 'updateIngredient' );
		component.saveIngredient();
		expect( updateSpy ).toHaveBeenCalledWith( MockedIngredients[ 0 ] );
	} );

	it( 'should create new ingredient', () => {
		const newIngredient = { ...MockedIngredients[ 0 ], id: null };
		const addSpy = spyOn( store, 'addIngredient' );
		component.data = newIngredient;
		component.ngOnInit();
		fixture.detectChanges();
		component.saveIngredient();
		expect( addSpy ).toHaveBeenCalledWith( newIngredient );
	} );
} );
