import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockEditorStoreService } from '../../../../testing/stub/editor-store.service';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';
import { MockedIngredients } from '../../../../testing/fixtures/ingredients';
import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';

import { GlassesListComponent } from './glasses-list.component';
import { CoreModule } from '../../core/core.module';
import { FirebaseService } from '../../core/services/firebase.service';
import { EditorModule } from '../editor.module';
import { StoreService } from '../services/store.service';
import { Glass } from '../../core/models/visualisation';

describe('GlassesListComponent', () => {
	let component: GlassesListComponent;
	let store: StoreService;
	let fixture: ComponentFixture<GlassesListComponent>;

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
		fixture = TestBed.createComponent(GlassesListComponent);
		store = TestBed.get(StoreService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});


	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display records', () => {
		const rows = fixture.nativeElement.querySelectorAll('mat-row');
		expect(rows.length).toEqual(MockedGlasses.length);
	});

	it('should display data', () => {
		const firstRow = fixture.nativeElement.querySelectorAll('mat-row')[ 0 ];
		const firstRowViz = firstRow.querySelector('svg.glass-preview');
		expect(firstRow.innerHTML).toContain(MockedIngredients[ 0 ].name);
		expect(firstRowViz).toBeDefined();
	});

	it('should display all columns', () => {
		const columns = fixture.nativeElement.querySelectorAll('mat-header-cell');
		expect(columns.length).toEqual(component.columns.length + 2); // +2 for add and delete columns defined by table
		                                                              // component
	});

	it('should fire edit action on click', () => {
		let glass: Glass | undefined;
		component.edit.subscribe(( d: Glass | undefined ) => glass = d);
		fixture.nativeElement.querySelector('mat-cell .app-table--edit-button').click();
		expect(glass).toEqual(MockedGlasses[ 0 ]);
	});

	it('should fire add new action on click', () => {
		let action;
		component.add.subscribe(( d: any ) => action = d);
		fixture.nativeElement.querySelector('mat-header-cell .app-table--edit-button').click();
		expect(action).toBeTruthy();
	});

	it('should remove record on click', () => {
		const removeSpy = spyOn(store, 'removeGlass');
		spyOn(window, 'confirm').and.callFake(() => true);
		fixture.nativeElement.querySelector('mat-cell .app-table--remove-button').click();
		expect(removeSpy).toHaveBeenCalledWith(MockedGlasses[ 0 ]);
	});
});
