import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit,
	ViewChild, ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { getAlcoholTypes, getFilteredDrinks } from './utils';
import { DrinkRecipe } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

export interface Filters {
	query?: string;
	types?: { [key: string]: boolean };
}

@Component({
	selector       : 'app-drinks-list',
	templateUrl    : './drinks-list.component.html',
	styleUrls      : [ './drinks-list.component.scss', './drinks-list-responsive.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit, OnDestroy {
	@ViewChild('drinksList') public drinksList: ElementRef;
	public searchControl: FormControl = new FormControl();

	public mobileListVisible: boolean = false;

	public loading: boolean = true;

	public drinks: DrinkRecipe[] = [];
	public visibleDrinks: DrinkRecipe[] = [];
	public currentDrink: DrinkRecipe | undefined;
	public alcoholTypes: string[] = []; // list of alcohol types found in drinks ingredients

	public filters: Filters = {
		query: '',
		types: {}
	};

	private filterFirstTimeClicked: boolean = false;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	public ngOnInit(): void {
		this.storeService.getAllDrinks()
		.pipe(takeUntil(this.ngOnDestroy$)).subscribe(( drinks: DrinkRecipe[] ) => {
			this.loading = !drinks.length;
			this.drinks = drinks;
			this.visibleDrinks = drinks;
			this.alcoholTypes = getAlcoholTypes(drinks);
			this.setTypeFilters();
			this.cdRef.detectChanges();
		});
		this.storeService.getCurrentDrink()
		.pipe(takeUntil(this.ngOnDestroy$)).subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			this.mobileListVisible = false;
			this.cdRef.detectChanges();
			const activeItem = this.drinksList && this.drinksList.nativeElement.querySelector('li.active');
			if ( activeItem ) {
				activeItem.scrollIntoView({ behavior: 'smooth' });
			}
		});

		this.searchControl.valueChanges
		.pipe(
			takeUntil(this.ngOnDestroy$),
			debounceTime(200),
			distinctUntilChanged()
		)
		.subscribe(( query: any ) => {
			this.filters.query = query;
			this.filterDrinks();
			this.cdRef.detectChanges();
		});
	}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.next(true);
	}

	public selectDrinkById( id: string ): void {
		this.storeService.setCurrentDrinkById(id);
		this.mobileListVisible = false;
	}


	public toggleFilterType( type: string ): void {
		if ( !this.filterFirstTimeClicked ) {
			this.resetTypeFilter(false);
		}
		this.filters.types[ type ] = !this.filters.types[ type ];
		this.filterDrinks();
		this.filterFirstTimeClicked = true;
	}

	public resetTypeFilter( resetTo: boolean = true ): void {
		this.filterFirstTimeClicked = false;
		Object.keys(this.filters.types).forEach(( type: string ) => {
			this.filters.types[ type ] = resetTo;
		});
		this.filterDrinks();
		this.cdRef.detectChanges();
	}

	public resetSearchQuery(): void {
		this.searchControl.reset('');
		this.cdRef.detectChanges();
	}

	public getDrinkAlcoholsClass( drink: DrinkRecipe ): string {
		return getAlcoholTypes([ drink ]).map(d => d.split(' ').join('')).join(' ');
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
