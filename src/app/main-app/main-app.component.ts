import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { DrinkRecipe } from '../core/models/visualisation';
import { StoreService } from './services/store.service';
import { takeUntil } from 'rxjs/operators';


@Component({
	selector       : 'app-main-app',
	templateUrl    : './main-app.component.html',
	styleUrls      : [ './main-app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainAppComponent implements OnInit, OnDestroy {
	public loading: boolean = true;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef, private router: Router ) {

	}

	public ngOnInit(): void {
		this.storeService.loadDrinks();
		this.storeService.getCurrentDrink()
		.pipe(takeUntil(this.ngOnDestroy$))
		.subscribe(( drink: DrinkRecipe | undefined ) => {
			if ( drink ) {
				this.loading = false;
				this.cdRef.detectChanges();
				const navigationExtras: NavigationExtras = {
					queryParams: { 'drink': drink.name.toLowerCase() },
				};
				this.router.navigate([ '/' ], navigationExtras).then(() => {
					(window as any).ga('send', 'pageview', this.router.routerState.snapshot.url);
				});
			}
		});
	}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.next(true);
	}

	public loadNextDrink(): void {
		this.storeService.setNextDrink();
	}

	public loadPrevDrink(): void {
		this.storeService.setPreviousDrink();
	}

}
