import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DrinkRecipe, Ingredient } from '../../core/models/visualisation';
import { StoreService } from '../../core/services/store.service';
import { map, takeUntil } from 'rxjs/operators';


export interface IngredientViewLayer {
  y: number;
  h: number;
  colour: string;
}

export interface ViewData {
  mask: string;
  path: string;
  drinkLayers: IngredientViewLayer[];
}

@Injectable()
export class VisualisationService implements OnDestroy {

  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

  constructor( private storeService: StoreService ) { }

  public ngOnDestroy(): void {
    this.ngOnDestroy$.emit(true);
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
          return { mask, path, drinkLayers };
        }));
  }

  /*
  * Function format input data and create drink layers
  * with information necessary to render them such as position, colour and height
  * @returns array with definition on how each layer should be rendered in the view
   */
  private createDrinkLayers( recipe: DrinkRecipe ): IngredientViewLayer[] {
    const glass = recipe.glass;
    const { maskHeight, maskTopMargin } = glass;
    const ingredients = recipe.ingredients;
    const ingredientsTotal = ingredients.reduce(( a: number, i: Ingredient ) => a + i.amount, 0); // total sum of all ingredients
    const ingredientScale = maskHeight / ingredientsTotal; // multiplier used to translate drink proportions to view px

    // position of current ingredient in the view as we iterate later position is being increased so layers are nex to eachother
    let topDist = maskTopMargin;
    return ingredients.map(( i: Ingredient ) => {
      const ingredientHeightScaled = i.amount * ingredientScale;
      const viewLayer: IngredientViewLayer = {
        y     : topDist,
        h     : ingredientHeightScaled,
        colour: i.colour
      };
      topDist += ingredientHeightScaled;
      return viewLayer;
    });
  }

}
