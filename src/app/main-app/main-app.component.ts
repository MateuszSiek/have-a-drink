import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy,
	OnInit
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { DrinkRecipe } from '../core/models/visualisation';
import { StoreService } from './services/store.service';
import { takeUntil, throttleTime } from 'rxjs/operators';


@Component({
	selector       : 'app-main-app',
	templateUrl    : './main-app.component.html',
	styleUrls      : [ './main-app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainAppComponent implements OnInit, OnDestroy {
	public loading: boolean = true;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter<boolean>();
	private keyPress: EventEmitter<number> = new EventEmitter<number>();

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef, private router: Router ) {

	}

	@HostListener('window:keydown', [ '$event' ])
	public onKeyDown( event: KeyboardEvent ): void {
		const { keyCode } = event;
		this.keyPress.next(keyCode);
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
				this.router.navigate([ '/' ], navigationExtras);
			}
		});
		this.keyPress.pipe(takeUntil(this.ngOnDestroy$), throttleTime(500))
		.subscribe(( keyCode: number ) => this.selectDrinkOnKeyPress(keyCode));
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

	private selectDrinkOnKeyPress( keyCode: number ): void {
		if ( keyCode === 40 || keyCode === 39 ) {
			this.loadNextDrink();
		}
		else if ( keyCode === 38 || keyCode === 37 ) {
			this.loadPrevDrink();
		}
	}
}
