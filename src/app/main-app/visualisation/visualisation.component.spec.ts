import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { VisualisationComponent } from './visualisation.component';
import { CoreModule } from '../../core/core.module';
import { DrinksListComponent } from '../drinks-list/drinks-list.component';
import { DescriptionComponent } from '../description/description.component';

import { StoreService } from '../services/store.service';

import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { DrinkRecipe, Ingredient } from '../../core/models/visualisation';

import { MockFirebaseService } from '../../../../testing/stub/mocked-firebase.service';
import { FirebaseService } from '../../core/services/firebase.service';
import { DrinksEffects } from '../store/effects';
import { mainAppInitialState, mainAppReducer } from '../store/reducers';
import { AppRootState } from '../../core/state';
import { SetCurrentDrink } from '../store/actions';

describe('VisualisationComponent', () => {
	let component: VisualisationComponent;
	let fixture: ComponentFixture<VisualisationComponent>;
	let storeService: StoreService;
	let store: Store<AppRootState>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports     : [
				CoreModule,
				ReactiveFormsModule,
				RouterTestingModule,
				StoreModule.forFeature('APP', mainAppReducer, { initialState: mainAppInitialState }),
				EffectsModule.forFeature([ DrinksEffects ]),
			],
			providers   : [
				StoreService,
				{ provide: FirebaseService, useClass: MockFirebaseService },
			],
			declarations: [ VisualisationComponent, DrinksListComponent, DescriptionComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VisualisationComponent);
		storeService = TestBed.get(StoreService);
		store = TestBed.get(Store);
		component = fixture.componentInstance;
		store.dispatch(new SetCurrentDrink(MockedDrinks[ 0 ]));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	const validateDrinkViz = ( drink: DrinkRecipe ) => {
		const nEl = fixture.nativeElement;
		const glassEl = nEl.querySelector('.path--glass-path');
		const maskEl = nEl.querySelector('#clipping-mask path');
		const ingredientEls = nEl.querySelectorAll('.ingredients-list ul li');
		const ingrRectEls = nEl.querySelectorAll('.g--ingredients rect');
		const glassPath = glassEl.getAttribute('d');
		const maskPath = maskEl.getAttribute('d');

		expect(glassPath).toEqual(drink.glass.path);
		expect(maskPath).toEqual(drink.glass.mask);
		expect(ingredientEls.length).toEqual(drink.ingredients.length);
		expect(ingrRectEls.length).toEqual(drink.ingredients.length);
		drink.ingredients.forEach(( i: Ingredient, idx: number ) => {
			expect(ingredientEls[ idx ].innerHTML).toContain(i.name);
		});
	};

	it('should render all view elements', ( done ) => {
		setTimeout(() => {
			validateDrinkViz(MockedDrinks[ 0 ]);
			done();
		}, 3000);
	});

});
