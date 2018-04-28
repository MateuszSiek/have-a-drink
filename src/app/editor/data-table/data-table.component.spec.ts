import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material';

import { mockTableColumns, mockTableData, MockTableDatum } from '../../../../testing/fixtures/mock-table-data';
import { DataTableMockComponent } from '../../../../testing/stub/data-table-template.component';

import { DataTableComponent } from './data-table.component';
import { CoreModule } from '../../core/core.module';
import { EditorModule } from '../editor.module';


describe('DataTableComponent default', () => {
	let component: DataTableComponent;
	let fixture: ComponentFixture<DataTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				CoreModule,
				EditorModule,
			]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataTableComponent);
		component = fixture.componentInstance;
		component.dataSource = new MatTableDataSource(mockTableData);
		component.columns = mockTableColumns;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain all data', () => {
		const viewHtml = fixture.nativeElement.innerHTML;
		expect(viewHtml).toContain(mockTableData[ 0 ].name);
		expect(viewHtml).toContain(mockTableData[ 0 ].value);
		expect(viewHtml).toContain(mockTableData[ 1 ].name);
		expect(viewHtml).toContain(mockTableData[ 1 ].value);
		expect(viewHtml).toContain(mockTableColumns[ 0 ].header);
		expect(viewHtml).toContain(mockTableColumns[ 1 ].header);
	});


	it('should fire edit action on click', () => {
		let datum: any;
		component.edit.subscribe(( d: any ) => datum = d);
		fixture.nativeElement.querySelector('mat-cell .app-table--edit-button').click();
		expect(datum).toEqual(mockTableData[ 0 ]);
	});

	it('should fire add new action on click', () => {
		let action: any;
		component.add.subscribe(( d: any ) => action = d);
		fixture.nativeElement.querySelector('mat-header-cell .app-table--edit-button').click();
		expect(action).toBeTruthy();
	});

	it('should remove record on click', () => {
		let datum: MockTableDatum | undefined;
		component.remove.subscribe(( d: any ) => datum = d);
		fixture.nativeElement.querySelector('mat-cell .app-table--remove-button').click();
		expect(datum).toEqual(mockTableData[ 0 ]);
	});
});


describe('DataTableComponent template', () => {
	let component: DataTableMockComponent;
	let fixture: ComponentFixture<DataTableMockComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [
				CoreModule,
				EditorModule,
			],
			providers   : [
				DataTableMockComponent,
			],
			declarations: [ DataTableMockComponent ]
		});
		TestBed.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataTableMockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should contain data with custom template', () => {
		const viewHtml = fixture.nativeElement.innerHTML;
		expect(viewHtml).toContain(mockTableData[ 0 ].name + ' - template');
		expect(viewHtml).toContain(mockTableData[ 1 ].name + ' - template');
	});
});
