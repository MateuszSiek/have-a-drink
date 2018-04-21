import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Glass } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';
import { TableColumn } from '../data-table/data-table.component';

@Component( {
	selector: 'app-glasses-list',
	templateUrl: './glasses-list.component.html',
	styleUrls: [ './glasses-list.component.scss' ]
} )
export class GlassesListComponent implements OnInit {
	public dataSource: MatTableDataSource<Glass> = new MatTableDataSource();
	@Output() public add: EventEmitter<boolean> = new EventEmitter();
	@Output() public edit: EventEmitter<Glass> = new EventEmitter();
	public columns: TableColumn[] = [
		{
			header: 'Name',
			valueField: 'name',
		}, {
			header: 'Svg',
			valueField: 'svg',
		},
	];

	constructor(private store: StoreService) {}

	public ngOnInit(): void {
		this.store.getGlasses().subscribe( (data: Glass[]) => this.dataSource.data = data );
	}

	public removeRecord(glass: Glass): void {
		if ( confirm( 'Are you sure to delete this item?' ) ) {
			this.store.removeGlass( glass );
		}
	}

	public editRecord(glass: Glass): void {
		this.edit.next( glass );
	}

	public addNew(): void {
		this.add.next( true );
	}

}

