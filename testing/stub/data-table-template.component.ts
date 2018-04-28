import { MatTableDataSource } from '@angular/material';
import { Component } from '@angular/core';
import { mockTableColumns, mockTableData, MockTableDatum } from '../fixtures/mock-table-data';
import { TableColumn } from '../../src/app/editor/data-table/data-table.component';

@Component( {
	template: `
        <app-data-table [dataSource]="dataSource"
                        [columns]="columns"
        >
            <ng-template let-value="value" [appTableCell]="'name'">
	                {{value}} - template
            </ng-template>
        </app-data-table>
	`
} )
export class DataTableMockComponent {
	public dataSource: MatTableDataSource<MockTableDatum> = new MatTableDataSource( mockTableData );
	public columns: TableColumn[] = mockTableColumns;
}
