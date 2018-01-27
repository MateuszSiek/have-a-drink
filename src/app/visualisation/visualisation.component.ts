import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';

import * as SnapTS from 'snapsvg';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { IngredientViewLayer, ViewData, VisualisationService } from './service/visualisation.service';

declare const Snap: any;
declare const mina: any;    // if you want to use animations of course

const VIEWBOX_HEIGHT = 60;

@Component({
  selector       : 'app-visualisation',
  templateUrl    : './visualisation.component.html',
  styleUrls      : [ './visualisation.component.scss' ],
  providers      : [ VisualisationService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualisationComponent implements OnInit, OnDestroy {
  @ViewChild('svgContainer') public svgContainer: ElementRef;

  public snapSvg: SnapTS.Paper;

  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

  constructor( private visualisationService: VisualisationService ) {}

  public ngOnDestroy(): void {
    this.ngOnDestroy$.emit(true);
  }

  public ngOnInit(): void {
    this.snapSvg = Snap(this.svgContainer.nativeElement);
    this.visualisationService.getViewData()
      .pipe(
        takeUntil(this.ngOnDestroy$),
        filter(( data: ViewData | undefined ) => !!data), // TODO handle undefined data
        switchMap(( data: ViewData ) => this.renderDrink(data))
      )
      .subscribe();
  }

  /*
  * Main function used to trigger whole render cycle,
  * from cleaning previous render through rendering new glass and updating mask to rendering ingredients
  * @returns observable which is triggered once whole visualisation was re-rendered
   */
  private renderDrink( { mask, path, drinkLayers }: ViewData ): Observable<void> {
    return this.cleanUpCurrentRender()
      .pipe(
        tap(() => this.setClippingMask(mask)),
        switchMap(() => this.renderGlass(path)),
        switchMap(() => this.renderIngredients(drinkLayers)),
        take(1)
      );
  }

  /*
  * Function used to update view mask used to clip ingredients rectangle
  * so that only the part of view in the glass is visible
   */
  private setClippingMask( path: string ): void {
    this.snapSvg.select('#clipping-mask path').attr({ d: path });
  }

  /*
  * Before creating new render we should clean up previous one.
  * In this case we are animating ingredients layers to create effect of emptying the glass
  * @returns observable which is triggered once animation has finished
   */
  private cleanUpCurrentRender(): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => {
        const ingredientsView: SnapTS.Element = this.snapSvg.select('.g--ingredients g');
        if ( ingredientsView ) {
          ingredientsView.animate({
            // transitioning the view to the bottom and scaling in to 0
            // to create effect of emptying the glass
            transform: `t 0 ${VIEWBOX_HEIGHT} s1 0`,
            opacity  : 0
          }, 400, mina.linear, () => {
            // once animation is finished we can destroy view elements
            Snap(this.snapSvg.select('.g--ingredients')).clear();
            cb();
          });
        }
        else {
          cb();
        }
      }
    )();
  }

  /*
  * Function responsible for rendering ingredients rectangles inside `.ingredients-layers` view element in the template.
  * Once rectangle for every ingredient is appended to the view animation is triggered
  * @returns observable which is triggered once animation has finished
   */
  private renderIngredients( layers: IngredientViewLayer[] ): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => {
        const container: SnapTS.Paper = Snap(this.snapSvg.select('.g--ingredients'))
          .g() // adding additional grouping element which will be animated
          .attr({
            // set scale to 0 and move to the bottom of view so then we can scale it up and update position
            // to create illusion of filling the glass up from the bottom
            transform: `t 0 ${VIEWBOX_HEIGHT} s1 0`,
            opacity  : 0
          });

        layers.forEach(( layer: IngredientViewLayer ) => { // appending ingredients rectangles to the view
          container.rect(0, layer.y, 45, layer.h).attr({ 'fill': layer.colour });
        });

        container.animate({
          transform: 't 0 0 s1 1',
          opacity  : 1
        }, 600, mina.linear, cb);
      }
    )();
  }

  /*
  * Function responsible for rendering/updating glass path with animation.
  * @returns observable which is triggered once animation has finished
   */
  private renderGlass( path: string = '' ): Observable<void> {
    return bindCallback(
      ( cb: () => void ) => { // callback function
        this.snapSvg.select('path').animate({ d: path }, 300, mina.easeinout, cb);
      }
    )();
  }

}
