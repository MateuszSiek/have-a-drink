import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { StoreService } from '../services/store.service';
import { Ingredient } from '../../core/models/visualisation';
import { TableColumn } from '../data-table/data-table.component';

@Component( {
	selector: 'app-ingredients-list',
	templateUrl: './ingredients-list.component.html',
	styleUrls: [ './ingredients-list.component.scss' ]
} )
export class IngredientsListComponent implements OnInit {
	public dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource();
	@Output() public add: EventEmitter<boolean> = new EventEmitter();
	@Output() public edit: EventEmitter<Ingredient> = new EventEmitter();
	public columns: TableColumn[] = [
		{
			header: 'Name',
			valueField: 'name',
		}, {
			header: 'Colour',
			valueField: 'colour',
		},
	];

	constructor(private store: StoreService) {}

	public ngOnInit(): void {
		this.store.getIngredients().subscribe( (data: Ingredient[]) => this.dataSource.data = data );
	}

	public removeRecord(ingredient: Ingredient): void {
		if ( confirm( 'Are you sure to delete this item?' ) ) {
			this.store.removeIngredient( ingredient );
		}
	}

	public addNew(): void {
		this.add.next( true );
	}

	public editRecord(item: Ingredient): void {
		this.edit.next( item );
	}
}
