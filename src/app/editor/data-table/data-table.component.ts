import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList,
	TemplateRef
} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TableCellDirective } from './table-cell.directive';

export interface TableColumn {
	header: string;
	valueField: string;
}

@Component( {
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: [ './data-table.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DataTableComponent implements AfterViewInit {
	@ContentChildren( TableCellDirective ) public cellTemplates?: QueryList<TableCellDirective>;

	@Output() public add: EventEmitter<boolean> = new EventEmitter();
	@Output() public edit: EventEmitter<any> = new EventEmitter();
	@Output() public remove: EventEmitter<any> = new EventEmitter();

	@Input() public dataSource?: MatTableDataSource<any>;

	@Input( 'columns' )
	set columns(columns: TableColumn[]) {
		this.allColumns = [ ...columns.map( (c: TableColumn) => c.valueField ), 'edit', 'delete' ];
		this.userColumns = columns;
	}

	public cellTemplateDefs: { [ key: string ]: TemplateRef<any> } = {};

	public allColumns: string[] = [];
	public userColumns: TableColumn[] = [];

	constructor(private cdRef: ChangeDetectorRef) { }

	public ngAfterViewInit(): void {
		if ( this.cellTemplates ) {
			this.cellTemplates.forEach( (cell: TableCellDirective) => {
				this.cellTemplateDefs[ cell.name ] = cell.templateRef;
			} );
			this.cdRef.detectChanges();
		}
	}

	public editRecord(record: any): void {
		this.edit.next( record );
	}

	public removeRecord(record: any): void {
		this.remove.next( record );
	}

	public addNew(): void {
		this.add.next( true );
	}
}
