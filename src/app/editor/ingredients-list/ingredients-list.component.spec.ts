import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';

import { IngredientsListComponent } from './ingredients-list.component';
import { CoreModule } from '../../core/core.module';
import { FirebaseService } from '../../core/services/firebase.service';
import { EditorModule } from '../editor.module';
import { StoreService } from '../services/store.service';
import { Ingredient } from '../../core/models/visualisation';

describe('IngredientsListComponent', () => {
	let component: IngredientsListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<IngredientsListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule(
			{
				imports     : [
					CoreModule,
					EditorModule,
				],
				providers   : [
					{ provide: StoreService, useClass: MockEditorStoreService },
					{ provide: FirebaseService, useClass: MockFirebaseService },
				]
			});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IngredientsListComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll('mat-row');
		expect(rows.length).toEqual(MockedIngredients.length);
	});

	it('should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll('mat-row')[ 0 ];
		expect(firstRow.innerHTML).toContain(MockedIngredients[ 0 ].name);
		expect(firstRow.innerHTML).toContain(MockedIngredients[ 0 ].colour);
		expect(firstRow.innerHTML).toContain('__colour-cell');
	});

	it('should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll('mat-header-cell');
		// +2 for add and delete columns defined by table component
		expect(columns.length).toEqual(component.columns.length + 2);
	});

	it('should fire edit action on click', () => {
		let ingredient: Ingredient | undefined;
		component.edit.subscribe(( d: Ingredient | undefined ) => ingredient = d);
		fixture.nativeElement.querySelector('mat-cell .app-table--edit-button').click();
		expect(ingredient).toEqual(MockedIngredients[ 0 ]);
	});

	it('should fire add new action on click', () => {
		let action: any;
		component.add.subscribe(( d: any ) => action = d);
		fixture.nativeElement.querySelector('mat-header-cell .app-table--edit-button').click();
		expect(action).toBeTruthy();
	});

	it('should remove record on click', () => {
		const removeSpy = spyOn(store, 'removeIngredient');
		spyOn(window, 'confirm').and.callFake(() => true);
		fixture.nativeElement.querySelector('mat-cell .app-table--remove-button').click();
		expect(removeSpy).toHaveBeenCalledWith(MockedIngredients[ 0 ]);
	});
});
