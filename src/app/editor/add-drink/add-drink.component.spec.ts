import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';

import { AddDrinkComponent } from './add-drink.component';
import { FirebaseService } from '../../core/services/firebase.service';
import { StoreService } from '../services/store.service';
import { EditorModule } from '../editor.module';
import { CoreModule } from '../../core/core.module';


describe('AddDrinkComponent', () => {
	let component: AddDrinkComponent;
	let fixture: ComponentFixture<AddDrinkComponent>;
	let store: StoreService;

	beforeEach(async(() => {
		TestBed.configureTestingModule(
			{
				imports  : [
					CoreModule,
					EditorModule,
					NoopAnimationsModule
				],
				providers: [
					{ provide: StoreService, useClass: MockEditorStoreService },
					{ provide: FirebaseService, useClass: MockFirebaseService },
					{ provide: MatDialogRef, useValue: { close: (): void => undefined } },
					{ provide: MAT_DIALOG_DATA, useValue: {} },
				]
			});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddDrinkComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		component.data = MockedDrinks[ 0 ];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set form fields', () => {
		const formValue = component.form!.value;
		expect(formValue!.id).toEqual(MockedDrinks[ 0 ].id);
		expect(formValue!.active).toEqual(MockedDrinks[ 0 ].active);
		expect(formValue!.name).toEqual(MockedDrinks[ 0 ].name);
		expect(formValue!.glass).toEqual(MockedDrinks[ 0 ].glass);
		expect(formValue!.ingredients.length).toEqual(MockedDrinks[ 0 ].ingredients.length);
	});


	it('should save drink', () => {
		const updateSpy = spyOn(store, 'updateDrink');
		component.saveDrink();
		expect(updateSpy).toHaveBeenCalledWith(MockedDrinks[ 0 ]);
	});


	it('should create new drink', () => {
		const newDrink: any = { ...MockedDrinks[ 0 ], id: null };
		const addSpy = spyOn(store, 'addDrink');
		component.data = newDrink;
		component.ngOnInit();
		fixture.detectChanges();
		component.saveDrink();
		expect(addSpy).toHaveBeenCalledWith(newDrink);
	});
});
