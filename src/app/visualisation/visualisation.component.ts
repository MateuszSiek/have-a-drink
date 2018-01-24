import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { GLASS_DATA } from '../core/data/glass';
import { DrinkRecipe } from '../core/models/visualisation';
import { StoreService } from '../core/services/store.service';

declare const Snap: any;
declare const mina: any;    // if you want to use animations of course

@Component({
  selector   : 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls  : [ './visualisation.component.scss' ]
})
export class VisualisationComponent implements OnInit {
  @ViewChild('svgContainer') public svgContainer: ElementRef;

  public clippingMask: string = GLASS_DATA[ 2 ].mask;

  constructor( private storeService: StoreService ) {
  }

  public ngOnInit(): void {
    this.storeService.getCurrentDrink().subscribe(( drink: DrinkRecipe | undefined ) => {
      if ( drink ) {
        this.renderGlass(drink);
        this.clippingMask = drink.glass.mask;
        setTimeout(() => {
          this.storeService.setNextDrink();
        }, 3000);
      }
    });
  }

  private renderGlass( drink: DrinkRecipe ): void {
    const s = Snap(this.svgContainer.nativeElement);
    const path = Snap.select('path');

    path.animate({ d: drink.glass.path }, 400);
  }

}
