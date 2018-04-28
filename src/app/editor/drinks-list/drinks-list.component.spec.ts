import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';

import { DrinksListComponent } from './drinks-list.component';
import { CoreModule } from '../../core/core.module';
import { FirebaseService } from '../../core/services/firebase.service';
import { StoreService } from '../services/store.service';
import { EditorModule } from '../editor.module';
import { DrinkRecipe } from '../../core/models/visualisation';

describe('DrinksListComponent', () => {
	let component: DrinksListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<DrinksListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule(
			{
				imports     : [
					CoreModule,
					EditorModule
				],
				providers   : [
					{ provide: StoreService, useClass: MockEditorStoreService },
					{ provide: FirebaseService, useClass: MockFirebaseService },
				]
			});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DrinksListComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll('mat-row');
		expect(rows.length).toEqual(MockedDrinks.length);
	});

	it('should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll('mat-row')[ 0 ];
		const firstRowViz = firstRow.querySelector('svg.glass-preview');
		expect(firstRow.innerHTML).toContain(MockedDrinks[ 0 ].name);
		expect(firstRow.innerHTML).toContain(MockedIngredients[ 0 ].name);
		expect(firstRow.innerHTML).toContain(MockedIngredients[ 1 ].name);
		expect(firstRowViz).toBeDefined();
	});

	it('should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll('mat-header-cell');
		// +2 for add and delete columns defined by table component
		expect(columns.length).toEqual(component.columns.length + 2);
	});

	it('should fire edit action on click', () => {
		let recipe: DrinkRecipe | undefined;
		component.edit.subscribe(( d: DrinkRecipe | undefined ) => recipe = d);
		fixture.nativeElement.querySelector('mat-cell .app-table--edit-button').click();
		expect(recipe).toEqual(MockedDrinks[ 0 ]);
	});

	it('should fire add new action on click', () => {
		let action;
		component.add.subscribe(( d: any ) => action = d);
		fixture.nativeElement.querySelector('mat-header-cell .app-table--edit-button').click();
		expect(action).toBeTruthy();
	});

	it('should remove record on click', () => {
		const removeDrinkSpy = spyOn(store, 'removeDrink');
		spyOn(window, 'confirm').and.callFake(() => true);
		fixture.nativeElement.querySelector('mat-cell .app-table--remove-button').click();
		expect(removeDrinkSpy).toHaveBeenCalledWith(MockedDrinks[ 0 ]);
	});
});
