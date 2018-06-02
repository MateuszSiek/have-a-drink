import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DrinkRecipe, Glass, Ingredient } from '../../../core/models/visualisation';
import { map, takeUntil } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';

import * as d3 from 'd3';

export interface IngredientViewLayer {
	y: number;
	h: number;
	colour: string;
}

export interface GlassMaskSize {
	topMargin: number;
	height: number;
}

export interface ViewData {
	mask: string;
	path: string;
	drinkLayers: IngredientViewLayer[];
	recipe: DrinkRecipe;
	maskData: GlassMaskSize;
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
			map(( recipe: DrinkRecipe | undefined ) => {
				if ( !(recipe && recipe.glass && recipe.ingredients && recipe.ingredients.length) ) {
					return undefined;
				}
				const maskData: GlassMaskSize = this.getMaskMeasurements(recipe);
				const drinkLayers = this.createDrinkLayers(recipe, maskData);
				const mask = recipe.glass.mask;
				const path = recipe.glass.path;
				return { mask, path, drinkLayers, maskData, recipe };
			}));
	}

	/*
	 * Function format input data and create drink layers
	 * with information necessary to render them such as position, colour and height
	 * @returns array with definition on how each layer should be rendered in the view
	 */
	private createDrinkLayers( recipe: DrinkRecipe, maskData: GlassMaskSize ): IngredientViewLayer[] {
		const maskHeight = maskData.height;
		const maskTopMargin = maskData.topMargin;
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

	private getMaskMeasurements( drink: DrinkRecipe ): GlassMaskSize {
		const tmpContainer = d3.select('body').append('svg').attr('viewBox', '0 0 45 60');
		const mask = tmpContainer.append('path').attr('d', drink.glass.mask);
		const maskBBox = (mask.node() as SVGPathElement).getBBox();
		tmpContainer.remove();
		return {
			topMargin: Number(maskBBox.y.toFixed(2)),
			height   : Number(maskBBox.height.toFixed(2))
		};
	}

}
