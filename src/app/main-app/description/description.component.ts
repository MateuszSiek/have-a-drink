import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DrinkRecipe } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

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
