import {
	ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit,
	ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { bindCallback } from 'rxjs/observable/bindCallback';

import * as d3 from 'd3';

import { switchMap } from 'rxjs/operators';
import { DrinkRecipe } from '../../core/models/visualisation';
import { StoreService } from '../services/store.service';

export type D3Selection = d3.Selection<d3.BaseType, any, d3.BaseType, undefined>;

@Component({
	selector       : 'app-title',
	template       : `
        <h1 #titleContainer>
            &nbsp;
            <div class="div--text-container div--current-title"></div>
            <div class="div--text-container div--temp-title"></div>
        </h1>
	`,
	styleUrls      : [ `./title.component.scss` ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent implements OnInit, OnDestroy {
	@ViewChild('titleContainer') public titleContainer: ElementRef;

	public d3MainContainer: D3Selection;

	private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

	constructor( private storeService: StoreService ) {}

	public ngOnDestroy(): void {
		this.ngOnDestroy$.emit(true);
	}

	public ngOnInit(): void {
		this.d3MainContainer = d3.select(this.titleContainer.nativeElement);
		this.storeService.getCurrentDrink()
		.pipe(
			switchMap(( drink: DrinkRecipe | undefined ) => this.renderTitle(drink && drink.name || ''))
		)
		.subscribe(() => {});
	}

	private renderTitle( title: string ): Observable<void> {
		return bindCallback(( cb: () => void ) => {
			const titleLetters = title.split('');
			const tempTitleContainer = this.d3MainContainer.select('.div--temp-title').html('');
			const oldTitleContainer = this.d3MainContainer.select('.div--current-title');
			this.appendText(titleLetters, tempTitleContainer);

			// set initial position for animation based on previous set of characters
			// if new character can be found in previous text we move it to its position so then we can move it back
			// to its default position creating effect of shifting letters
			tempTitleContainer.selectAll('span')
			.style('transform', ( d: any, idx: number, els: HTMLElement[] ) => {
				const findInOld = oldTitleContainer.select('span.letter-' + d.letter);
				const oldEL = findInOld.node() as HTMLElement;
				const { x: xRel, y: yRel } = oldEL && this.getRelativePosition(els[ idx ], oldEL) || { x: 0, y: 0 };
				const scale = oldEL ? 1 : 0;
				return `translate(${xRel}px,${yRel}px)scale(${scale})`;
			});

			oldTitleContainer.selectAll('span')
			.transition()
			.duration(700)
			.style('transform', 'scale(0)')
			.style('opacity', 0);

			tempTitleContainer.selectAll('span')
			.transition()
			.duration(1500)
			.style('transform', 'translate(0,0)scale(1)')
			.style('opacity', 1)
			.on('end', () => {
				oldTitleContainer.html('');
				cb();
			});

			// swapping classes so that temp title becomes current title
			// and current title(which is an old one) becomes a new one ready for new animation
			oldTitleContainer.classed('div--current-title', false).classed('div--temp-title', true);
			tempTitleContainer.classed('div--temp-title', false).classed('div--current-title', true);
		})();
	}

	private getRelativePosition( el1: HTMLElement, el2: HTMLElement ): { x: number, y: number } {
		const x = el2.getBoundingClientRect().left - el1.getBoundingClientRect().left;
		const y = el1.getBoundingClientRect().top - el2.getBoundingClientRect().top;
		return { x, y };
	}

	private appendText( letters: string[], container: D3Selection ): void {
		letters.forEach(( letter: string ) => {
			container.append('span')
			.style('display', 'inline-block')
			.style('width', letter === ' ' ? '1rem' : '')
			.text(letter.toUpperCase())
			.classed('letter-' + letter.toUpperCase(), true)
			.datum<{ letter: string }>({ letter: letter.toUpperCase() });
		});
	}
}
