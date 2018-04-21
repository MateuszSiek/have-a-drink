import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DrinkRecipe, Glass } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';
import { TableColumn } from '../data-table/data-table.component';

@Component( {
	selector: 'app-drinks-list',
	templateUrl: './drinks-list.component.html',
	styleUrls: [ './drinks-list.component.scss' ]
} )
export class DrinksListComponent implements OnInit {
	public dataSource: MatTableDataSource<DrinkRecipe> = new MatTableDataSource();
	@Output() public add: EventEmitter<boolean> = new EventEmitter();
	@Output() public edit: EventEmitter<DrinkRecipe> = new EventEmitter();
	public columns: TableColumn[] = [
		{
			header: 'Name',
			valueField: 'name',
		}, {
			header: 'Glass',
			valueField: 'glass',
		}, {
			header: 'Ingredients',
			valueField: 'ingredients',
		},
	];

	constructor(private store: StoreService) {}

	public ngOnInit(): void {
		this.store.getDrinks().subscribe( (drink: DrinkRecipe[]) => this.dataSource.data = drink );
	}

	public removeRecord(drink: DrinkRecipe): void {
		if ( confirm( 'Are you sure to delete this item?' ) ) {
			this.store.removeDrink( drink );
		}
	}

	public editRecord(drink: DrinkRecipe): void {
		this.edit.next( drink );
	}

	public addNew(): void {
		this.add.next( true );
	}
}

