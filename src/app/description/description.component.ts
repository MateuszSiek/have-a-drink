import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreService } from '../core/services/store.service';
import { DrinkRecipe } from '../core/models/visualisation';

@Component({
	selector       : 'app-description',
	templateUrl    : './description.component.html',
	styleUrls      : [ './description.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent implements OnInit {
	public currentDrink: DrinkRecipe | undefined;

	constructor( private storeService: StoreService, private cdRef: ChangeDetectorRef ) { }

	public ngOnInit(): void {
		this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
			this.currentDrink = drink;
			this.cdRef.detectChanges();
		});
	}

}
