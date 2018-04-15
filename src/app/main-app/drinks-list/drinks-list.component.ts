import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { getAlcoholTypes, getFilteredDrinks } from './utils';
import { DrinkRecipe } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

export interface Filters {
	query: string | undefined;
	types: { [key: string]: boolean };
}

@Component({
	selector       : 'app-drinks-list',
	templateUrl    : './drinks-list.component.html',
	styleUrls      : [ './drinks-list.component.scss', './drinks-list-responsive.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {
	public searchControl: FormControl = new FormControl();

	public mobileListVisible: boolean = false;

	public drinks: DrinkRecipe[] = [];
	public visibleDrinks: DrinkRecipe[] = [];
	public currentDrink: DrinkRecipe | undefined;
	public alcoholTypes: string[] = []; // list of alcohol types found in drinks ingredients

	public filters: Filters = {
		query: undefined,
		types: {}
	};

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	public ngOnInit(): void {
		this.storeService.getAllDrinks().subscribe(( drinks: DrinkRecipe[] ) => {
			this.drinks = drinks;
			this.visibleDrinks = drinks;
			this.alcoholTypes = getAlcoholTypes(drinks);
			this.setTypeFilters();
			this.cdRef.detectChanges();
		});
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			this.cdRef.detectChanges();
		});

		this.searchControl.valueChanges
		.pipe(debounceTime(200), distinctUntilChanged())
		.subscribe(( query: any ) => {
			this.filters.query = query;
			this.filterDrinks();
		});
	}

	public selectDrinkById( id: string ): void {
		this.storeService.setCurrentDrinkById(id);
	}


	public toggleFilterType( type: string ): void {
		this.filters.types[ type ] = !this.filters.types[ type ];
		this.filterDrinks();
	}

	public resetTypeFilter(): void {
		Object.keys(this.filters.types).forEach(( type: string ) => {
			this.filters.types[ type ] = true;
		});
		this.filterDrinks();
		this.cdRef.detectChanges();
	}

	public resetSearchQuery(): void {
		this.searchControl.reset('');
		this.cdRef.detectChanges();
	}

	private setTypeFilters(): void {
		this.filters.types = this.alcoholTypes
		.reduce(( a: { [key: string]: boolean }, t: string ) => ({ ...a, [ t ]: true }), {});
	}

	private filterDrinks(): void {
		this.visibleDrinks = getFilteredDrinks(this.drinks, this.filters);
		this.cdRef.detectChanges();
	}


}
