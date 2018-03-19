import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DrinkRecipe, Ingredient } from '../core/models/visualisation';
import { StoreService } from '../core/services/store.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Filters {
	query: string | undefined;
	types: { [key: string]: boolean };
}

@Component({
	selector       : 'app-drinks-list',
	templateUrl    : './drinks-list.component.html',
	styleUrls      : [ './drinks-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {
	public searchControl: FormControl = new FormControl();

	public drinks: DrinkRecipe[] = [];
	public visibleDrinks: DrinkRecipe[] = [];
	public currentDrink: DrinkRecipe | undefined;
	public alcoholTypes: string[] = [];

	public filters: Filters = {
		query: undefined,
		types: {}
	};

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	public ngOnInit(): void {
		console.log(this);
		this.storeService.getAllDrinks().subscribe(( drinks: DrinkRecipe[] ) => {
			this.drinks = drinks;
			this.visibleDrinks = drinks;
			this.alcoholTypes = this.findAlcoholTypes(drinks);
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

	public toogggleFilterType( type: string ): void {
		this.filters.types[ type ] = !this.filters.types[ type ];
	}

	private setTypeFilters(): void {
		this.filters.types = this.alcoholTypes
		.reduce(( a: { [key: string]: boolean }, t: string ) => {return { ...a, [ t ]: true };}, {});
	}

	private filterDrinks(): void {
		const drinkName = this.filters.query;
		const filter: boolean = !!(drinkName && drinkName.length);
		// if query available filter drinks otherwise return full list
		this.visibleDrinks = filter ? this.drinks.filter(( d: DrinkRecipe ) => {
			return !!(d.name.match(new RegExp(drinkName!, 'gi')));
		}) : this.drinks;
		this.cdRef.detectChanges();
	}

	private findAlcoholTypes( drinks: DrinkRecipe[] ): string[] {
		const types = drinks
		.reduce(( i: Ingredient[], d: DrinkRecipe ) => [ ...i, ...d.ingredients ], []) // get only ingredients
		.filter(( i: Ingredient ) => i.alcohol && i.type && i.type.length) // get only alcohol with type
		.map(( i: Ingredient ) => i.type); // get only types

		return Array.from(new Set(types)); // create array with unique values
	}
}
