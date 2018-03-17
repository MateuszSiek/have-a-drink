import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DrinkRecipe } from '../core/models/visualisation';
import { StoreService } from '../core/services/store.service';

@Component({
	selector       : 'app-drinks-list',
	templateUrl    : './drinks-list.component.html',
	styleUrls      : [ './drinks-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {

	public drinks: DrinkRecipe[] = [];
	public currentDrink: DrinkRecipe | undefined;

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	public ngOnInit(): void {
		this.storeService.getAllDrinks().subscribe(( drinks: DrinkRecipe[] ) => {
			this.drinks = drinks;
			this.cdRef.detectChanges();
		});
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			this.cdRef.detectChanges();
		});
	}

	public selectDrinkById( id: string ): void {
		this.storeService.setCurrentDrinkById(id);
	}
}
