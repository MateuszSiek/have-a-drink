import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';

import * as d3 from 'd3';

import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { IngredientViewLayer, ViewData, VisualisationService } from './service/visualisation.service';
import { D3Selection } from '../title/title.component';
import { Glass, Ingredient } from '../../core/models/visualisation';

const VIEWBOX_HEIGHT = 60;
const VIEWBOX_WIDTH = 45;
const ANIM_DURRATION = 400;


@Component({
	selector       : 'app-visualisation',
	templateUrl    : './visualisation.component.html',
	styleUrls      : [ './visualisation.component.scss', './visualisation-responsive.component.scss' ],
	providers      : [ VisualisationService ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualisationComponent implements OnInit, OnDestroy {
	@ViewChild('svgContainer') public svgContainer!: ElementRef;

	public ingredients: Ingredient[] = [];
	public ingredientsAmount: { [id: string]: number } = {};
	public listTop: number = 0;
	public listHeight: number = 0;

	public loading: boolean = true;

	public svgD3Selection?: D3Selection;

	public animating: boolean = true;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

	constructor( private visualisationService: VisualisationService, private cdRef: ChangeDetectorRef ) {}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.emit(true);
	}

	public ngOnInit(): void {
		this.svgD3Selection = d3.select(this.svgContainer.nativeElement);
		this.visualisationService.getViewData()
		.pipe(
			takeUntil(this.ngOnDestroy$),
			filter<any>(( data: ViewData | undefined ) => !!data), // TODO handle undefined data, fix that any
			tap(() => {
				this.animating = true;
				this.cdRef.detectChanges();
			}),
			tap(( data: ViewData ) => {
				this.loading = false;
				const glass = data.recipe.glass as Glass;
				this.listTop = (glass.maskTopMargin / VIEWBOX_HEIGHT) * 100;
				this.listHeight = (glass.maskHeight / VIEWBOX_HEIGHT) * 100;
				this.ingredients = data.recipe.ingredients;
				this.ingredientsAmount = data.recipe.ingredientsAmount;
				this.cdRef.detectChanges();
			}),
			switchMap(( data: ViewData ) => this.renderDrink(data)),
			tap(() => {
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
	private setClippingMask( pathString: string ): void {
		const path = this.svgD3Selection!.select<SVGPathElement>('#clipping-mask path');
		path.attr('d', pathString);
		const pathEl: SVGPathElement = path.node();

		const len = pathEl.getTotalLength();
		const points = [];
		const pathSize = pathEl.getBBox();
		for ( let i = 0; i < len; i += 1 ) {
			const point = pathEl.getPointAtLength(i);
			const xPerc = ((point.x - pathSize.x) / pathSize.width) * 100;
			const yPerc = ((point.y - pathSize.y) / pathSize.height) * 100;
			points.push(`${xPerc}% ${yPerc}%`);
		}
		const polygon = points.join(', ');

		this.svgD3Selection!.select('.g--ingredients')
		.style('clip-path', `polygon(${polygon})`)
		.style('-webkit-clip-path', `polygon(${polygon})`);
	}


	/*
	 * Before creating new render we should clean up previous one.
	 * In this case we are animating ingredients layers to create effect of emptying the glass
	 * @returns observable which is triggered once animation has finished
	 */
	private cleanUpCurrentRender(): Observable<void> {
		return bindCallback(
			( cb: () => void ) => {
				const ingredientsView: D3Selection = this.svgD3Selection!.select('.g--ingredients g');
				const ingrViewEl: SVGGElement = ingredientsView.node() as SVGGElement;
				if ( ingrViewEl ) {
					const callback = () => {
						ingredientsView.remove();
						cb();
					};
					ingredientsView.selectAll('rect')
					.transition()
					.duration(ANIM_DURRATION)
					.attr('transform', `scale(0,1)`)
					.on('end', callback);

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
				const container: D3Selection = this.svgD3Selection!.select('.g--ingredients').append('g');

				const mask: SVGPathElement = this.svgD3Selection!.select('#clipping-mask path').node() as SVGPathElement;
				const maskWidth = mask && mask.getBBox().width;
				layers.forEach(( layer: IngredientViewLayer ) => { // appending ingredients rectangles to the view
					container.append('rect')
					.attr('x', (VIEWBOX_WIDTH - maskWidth) / 2)
					.attr('transform', `scale(0,1)`)
					.attr('transform-origin', `center`)
					.attr('y', layer.y)
					.attr('width', maskWidth)
					.attr('height', layer.h)
					.style('fill', layer.colour)
					.attr('opacity', 0)
					.transition()
					.duration(ANIM_DURRATION)
					.attr('transform', `scale(1,1)`)
					.attr('opacity', 1)
					.on('end', cb);
				});
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
				const currentPath = this.svgD3Selection!.select('path');
				currentPath
				.transition()
				.duration(ANIM_DURRATION)
				.attrTween('d', this.pathTween(currentPath!.node() as SVGPathElement, path, 1))
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
