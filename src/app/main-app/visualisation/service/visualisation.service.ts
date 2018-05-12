import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DrinkRecipe, Glass, Ingredient } from '../../../core/models/visualisation';
import { map, takeUntil } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';


export interface IngredientViewLayer {
	y: number;
	h: number;
	colour: string;
}

export interface ViewData {
	mask: string;
	path: string;
	drinkLayers: IngredientViewLayer[];
	recipe: DrinkRecipe;
}

@Injectable()
export class VisualisationService implements OnDestroy {

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

	constructor( private storeService: StoreService ) { }

	public ngOnDestroy(): void {
		this.ngOnDestroy$.emit(true);
	}

	public getAllDrinks(): Observable<DrinkRecipe[]> {
		return this.storeService.getAllDrinks();
	}

	/*
	 * @returns observable stream with drink view data so on any update in the store view can fetch new data
	 */
	public getViewData(): Observable<ViewData | undefined> {
		return this.storeService.getCurrentDrink()
		.pipe(
			takeUntil(this.ngOnDestroy$),
			map(( drink: DrinkRecipe | undefined ) => {
				if ( !(drink && drink.glass && drink.ingredients && drink.ingredients.length) ) {
					return undefined;
				}
				const drinkLayers = this.createDrinkLayers(drink);
				const mask = drink.glass.mask;
				const path = drink.glass.path;
				return { mask, path, drinkLayers, recipe: drink };
			}));
	}

	/*
	 * Function format input data and create drink layers
	 * with information necessary to render them such as position, colour and height
	 * @returns array with definition on how each layer should be rendered in the view
	 */
	private createDrinkLayers( recipe: DrinkRecipe ): IngredientViewLayer[] {
		const glass = recipe.glass as Glass;
		const { maskHeight, maskTopMargin } = glass;
		const ingredients = recipe.ingredients;
		// total sum of all ingredients
		const ingredientsTotal = ingredients
		.reduce(( a: number, i: Ingredient ) => a + (recipe.ingredientsAmount[ i.id as string ].amount || 0), 0);
		// multiplier used to translate drink proportions to view px
		const ingredientScale = maskHeight / ingredientsTotal;

		// position of current ingredient in the view as we iterate later position is being increased so layers are nex
		// to eachother
		let topDist = maskTopMargin;
		return ingredients.map(( i: Ingredient ) => {
			const amount = recipe.ingredientsAmount[ i.id as string ].amount || 0;
			const ingredientHeightScaled = amount * ingredientScale;
			const viewLayer: IngredientViewLayer = {
				y     : topDist || 0,
				h     : ingredientHeightScaled || 0,
				colour: i.colour
			};
			topDist += ingredientHeightScaled;
			return viewLayer;
		});
	}

}
