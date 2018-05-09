import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DrinkRecipe } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';
import { takeUntil } from 'rxjs/operators';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector       : 'app-description',
	templateUrl    : './description.component.html',
	styleUrls      : [ './description.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('animState', [
			transition('* => *', [
				animate(700, keyframes([
					style({ transform: 'translateY(-20%)', opacity: 0 }),
					style({ transform: 'translateY(0%)', opacity: 1 }),
				]))
			]),
		])
	]
})
export class DescriptionComponent implements OnInit, OnDestroy {
	public currentDrink: DrinkRecipe | undefined;

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter<boolean>();

	public ngOnInit(): void {
		this.storeService.getCurrentDrink()
		.pipe(takeUntil(this.ngOnDestroy$))
		.subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			this.cdRef.detectChanges();
		});
	}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.next(true);
	}
}
