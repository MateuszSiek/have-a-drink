import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit,
	ViewChild
} from '@angular/core';
import { interpolatePath } from 'd3-interpolate-path';
import * as d3 from 'd3';

// import * as SnapTS from 'snapsvg';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { IngredientViewLayer, ViewData, VisualisationService } from './service/visualisation.service';
import { D3Selection } from '../title/title.component';
import { Ingredient } from '../core/models/visualisation';
import { animate, state, style, transition, trigger } from '@angular/animations';

const VIEWBOX_HEIGHT = 60;


@Component({
	selector       : 'app-visualisation',
	templateUrl    : './visualisation.component.html',
	styleUrls      : [ './visualisation.component.scss' ],
	providers      : [ VisualisationService ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualisationComponent implements OnInit, OnDestroy {
	@ViewChild('svgContainer') public svgContainer: ElementRef;

	public ingredients: Ingredient[] = [];
	public listTop: number = 0;
	public listHeight: number = 0;

	public svgD3Selection: D3Selection;

	public animating: boolean = true;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

	constructor( private visualisationService: VisualisationService, private cdRef: ChangeDetectorRef ) {}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.emit(true);
	}

	public ngOnInit(): void {
		console.log(this);
		this.svgD3Selection = d3.select(this.svgContainer.nativeElement);
		this.visualisationService.getViewData()
		.pipe(
			takeUntil(this.ngOnDestroy$),
			filter(( data: ViewData | undefined ) => !!data), // TODO handle undefined data
			tap(() => {
				this.animating = true;
				this.cdRef.detectChanges();
			}),
			tap(( data: ViewData ) => {
				const glass = data.recipe.glass;
				this.listTop = (glass.maskTopMargin / VIEWBOX_HEIGHT) * 100;
				this.listHeight = (glass.maskHeight / VIEWBOX_HEIGHT) * 100;
				this.ingredients = data.recipe.ingredients;
				this.cdRef.detectChanges();
			}),
			switchMap(( data: ViewData ) => this.renderDrink(data)),
			tap(() => {
				console.log('done');
				this.animating = false;
				this.cdRef.detectChanges();
			}),
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
		this.svgD3Selection.select('#clipping-mask path').attr('d', path);
	}

	/*
	 * Before creating new render we should clean up previous one.
	 * In this case we are animating ingredients layers to create effect of emptying the glass
	 * @returns observable which is triggered once animation has finished
	 */
	private cleanUpCurrentRender(): Observable<void> {
		return bindCallback(
			( cb: () => void ) => {
				const ingredientsView: D3Selection = this.svgD3Selection.select('.g--ingredients g');
				if ( ingredientsView.node() ) {
					ingredientsView
					.transition()
					.duration(1000)
					.attr('transform', `translate(0,${VIEWBOX_HEIGHT})`)
					.on('end', cb)
					.remove();
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
				const container: D3Selection = this.svgD3Selection.select('.g--ingredients')
				.append('g') // adding additional grouping element which will be animated
				.attr('transform', `translate(0,${VIEWBOX_HEIGHT})`);

				layers.forEach(( layer: IngredientViewLayer ) => { // appending ingredients rectangles to the view
					container.append('rect')
					.attr('x', 0)
					.attr('y', layer.y)
					.attr('width', 45)
					.attr('height', layer.h)
					.style('fill', layer.colour);
				});

				container.transition()
				.duration(500)
				.attr('transform', 'translate(0,0)')
				.on('end', cb);
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
				const currentPath = this.svgD3Selection.select('path');
				currentPath
				.transition()
				.duration(800)
				.attrTween('d', this.pathTween(currentPath!.node() as SVGPathElement, path, 0.5))
				.on('end', cb);
			}
		)();
	}

	private pathTween( currentPath: SVGPathElement, d1: string, precision: number ): any {
		return function (): any {
			const newPath: SVGPathElement = currentPath.cloneNode() as SVGPathElement;
			const n0 = currentPath.getTotalLength();
			const n1 = (newPath.setAttribute('d', d1), newPath).getTotalLength();
			// Uniform sampling of distance based on specified precision.
			const distances = [ 0 ];
			let i = 0;
			const dt = precision / Math.max(n0, n1);
			while ( (i += dt) < 1 ) {
				distances.push(i);
			}
			distances.push(1);

			// Compute point-interpolators at each distance.
			const points = distances.map(( t: number ) => {
				const p0 = currentPath.getPointAtLength(t * n0);
				const p1 = newPath.getPointAtLength(t * n1);
				return d3.interpolate([ p0.x, p0.y ], [ p1.x, p1.y ]);
			});

			return ( t: number ) => {
				return t < 1 ? 'M' + points.map(( p: any ) => p(t)).join('L') : d1;
			};
		};

	}
}
