import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DrinkRecipe } from '../core/models/visualisation';
import { NavigationExtras, Router } from '@angular/router';
import { StoreService } from '../core/services/store.service';

@Component({
	selector   : 'app-main-app',
	templateUrl: './main-app.component.html',
	styleUrls  : [ './main-app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainAppComponent implements OnInit {
	public currentDrink: DrinkRecipe | undefined;

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef, private router: Router ) {

	}

	public ngOnInit(): void {
		console.log('ngOnInit');
		this.storeService.loadDrinks();
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			if ( drink ) {
				const navigationExtras: NavigationExtras = {
					queryParams: { 'drink': drink.name.toLowerCase() },
				};
				this.router.navigate([ '/' ], navigationExtras);
			}
		});
	}

	public loadNextDrink(): void {
		this.storeService.setNextDrink();
	}

	public loadPrevDrink(): void {
		this.storeService.setPreviousDrink();
	}

}
