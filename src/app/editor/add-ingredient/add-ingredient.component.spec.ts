import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';

import { AddIngredientComponent } from './add-ingredient.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { StoreService } from '../services/store.service';
import { Ingredient } from '../../core/models/visualisation';
import { EditorModule } from '../editor.module';
import { CoreModule } from '../../core/core.module';

describe('AddIngredientComponent', () => {
	let component: AddIngredientComponent;
	let fixture: ComponentFixture<AddIngredientComponent>;
	let store: StoreService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [
				CoreModule,
				EditorModule,
				NoopAnimationsModule
			],
			providers   : [
				{ provide: StoreService, useClass: MockEditorStoreService },
				{ provide: FirebaseService, useClass: MockFirebaseService },
				{ provide: MatDialogRef, useValue: { close: (): void => undefined } },
				{ provide: MAT_DIALOG_DATA, useValue: MockedIngredients[ 0 ] },
			]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddIngredientComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should render ingredient fields with data', () => {
		const nameInput = fixture.nativeElement.querySelector('input[formControlName=name]');
		const colorInput = fixture.nativeElement.querySelector('input[formControlName=colour]');
		expect(nameInput.value).toEqual(MockedIngredients[ 0 ].name);
		expect(colorInput.value).toEqual(MockedIngredients[ 0 ].colour);
	});

	it('should save ingredient', () => {
		const updateSpy = spyOn(store, 'updateIngredient');
		component.saveIngredient();
		expect(updateSpy).toHaveBeenCalledWith(MockedIngredients[ 0 ]);
	});

	it('should create new ingredient', () => {
		const newIngredient: Ingredient = { ...MockedIngredients[ 0 ], id: null };
		const addSpy = spyOn(store, 'addIngredient');
		component.form = component.createForm( newIngredient );
		fixture.detectChanges();
		component.saveIngredient();
		expect(addSpy).toHaveBeenCalledWith(newIngredient);
	});
});
