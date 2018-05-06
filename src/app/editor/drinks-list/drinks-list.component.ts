import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DrinkRecipe, Glass } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';
import { TableColumn } from '../data-table/data-table.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector   : 'app-drinks-list',
	templateUrl: './drinks-list.component.html',
	styleUrls  : [ './drinks-list.component.scss' ]
})
export class DrinksListComponent implements OnInit, OnDestroy {
	public dataSource: MatTableDataSource<DrinkRecipe> = new MatTableDataSource();
	@Output() public add: EventEmitter<boolean> = new EventEmitter();
	@Output() public edit: EventEmitter<DrinkRecipe> = new EventEmitter();
	public columns: TableColumn[] = [
		{
			header    : 'Name',
			valueField: 'name',
		}, {
			header    : 'Ingredients',
			valueField: 'ingredients',
		}, {
			header    : 'Glass',
			valueField: 'glass',
		}
	];

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor( private store: StoreService ) {}

	public ngOnInit(): void {
		this.store.getDrinks()
		.pipe(takeUntil(this.ngOnDestroy$))
		.subscribe(( drink: DrinkRecipe[] ) => this.dataSource.data = drink);
	}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.next(true);
	}

	public removeRecord( drink: DrinkRecipe ): void {
		if ( confirm('Are you sure to delete this item?') ) {
			this.store.removeDrink(drink);
		}
	}

	public editRecord( drink: DrinkRecipe ): void {
		this.edit.next(drink);
	}

	public addNew(): void {
		this.add.next(true);
	}
}

