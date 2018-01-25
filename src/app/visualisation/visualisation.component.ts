import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { GLASS_DATA } from '../core/data/glass';
import { DrinkRecipe, Glass, Ingredient } from '../core/models/visualisation';
import { StoreService } from '../core/services/store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';

declare const Snap: any;
declare const mina: any;    // if you want to use animations of course

interface IngredientViewLayer {
  y: number;
  h: number;
  i: Ingredient;
}


@Component({
  selector   : 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls  : [ './visualisation.component.scss' ]
})
export class VisualisationComponent implements OnInit {
  @ViewChild('svgContainer') public svgContainer: ElementRef;

  public snapSvg: any;

  public clippingMask: string;

  constructor( private storeService: StoreService ) {
  }

  public ngOnInit(): void {
    this.snapSvg = Snap(this.svgContainer.nativeElement);
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
      if ( drink ) {
        this.clippingMask = drink.glass.mask;
        const drinkLayers = this.createDrinkLayers(drink);

        this.renderDrink(drink, drinkLayers);
        setTimeout(() => {
          this.storeService.setNextDrink();
        }, 7000);
      }
    });
  }

  private renderDrink( drink: DrinkRecipe, drinkLayers: IngredientViewLayer[] ): void {
    this.snapSvg.select('.ingredients-layers').clear();

    this.renderGlass(drink)
      .subscribe(() => {
        this.renderIngredients(drinkLayers);
      });
  }

  private renderIngredients( layers: IngredientViewLayer[] ): void {
    const container = this.snapSvg.select('.ingredients-layers');

    layers.forEach(( layer: IngredientViewLayer ) => {
      const rect = container.rect(0, 0, 45, 0).attr('fill', layer.i.colour);
      rect.animate({ height: layer.h, y: layer.y }, 1500);
    });
  }

  //
  private renderGlass( drink: DrinkRecipe ): Observable<void> {
    const render = ( cb: () => void ) => {
      const path = this.snapSvg.select('path');
      path.animate({ d: drink.glass.path }, 1500, mina.bounce, cb);
    };
    return Observable.bindCallback(render)();
  }

  private createDrinkLayers( recipe: DrinkRecipe ): IngredientViewLayer[] {
    const glass = recipe.glass;
    const { maskHeight, maskTopMargin } = glass;
    const ingredients = recipe.ingredients;
    const ingredientsTotal = ingredients.reduce(( acum: number, i: Ingredient ) => acum + i.amount, 0);
    const ingredientScale = maskHeight / ingredientsTotal;
    let topDist = maskTopMargin;
    return ingredients.map(( i: Ingredient ) => {
      const ingredientHeightScaled = i.amount * ingredientScale;
      const viewLayer: IngredientViewLayer = {
        y: topDist,
        h: ingredientHeightScaled,
        i: i
      };
      topDist += ingredientHeightScaled;
      return viewLayer;
    });
  }


}
