import { of } from 'rxjs/observable/of';
import { MockedDrinks } from '../fixtures/drinks';
import { MockedIngredients } from '../fixtures/ingredients';
import { MockedGlasses } from '../fixtures/glasses';
import { DrinkRecipe, Glass, Ingredient } from '../../src/app/core/models/visualisation';
import * as drinksActions from '../../src/app/editor/store/drinks/actions';
import { getDrink } from '../../src/app/editor/store';
import { take } from 'rxjs/operators';
import * as glassesActions from '../../src/app/editor/store/glasses/actions';
import * as ingredientsActions from '../../src/app/editor/store/ingredients/actions';
import { Observable } from 'rxjs/Observable';

export class MockEditorStoreService {

	// DRINKS
	public loadDrinks(): void {}

	public getDrinks(): Observable<DrinkRecipe[]> {
		return of(MockedDrinks);
	}

	public addDrink(): void {}

	public getDrink(): Observable<DrinkRecipe | undefined> {
		return of(MockedDrinks[ 0 ]);
	}

	public updateDrink( drink: DrinkRecipe ): void {}

	public removeDrink(): void {}

	// INGREDIENTS
	public loadIngredients(): void {}

	public getIngredients(): Observable<Ingredient[]> {
		return of(MockedIngredients);
	}

	public addIngredient(): void {}

	public getIngredient( id: string ): Observable<Ingredient | undefined> {
		return of(MockedIngredients[ 0 ]);
	}

	public updateIngredient(): void {}

	public removeIngredient(): void {}

	// GLASSES

	public loadGlasses(): void {}

	public getGlasses(): Observable<Glass[]> {
		return of(MockedGlasses);
	}

	public addGlass(): void {}

	public getGlass(): Observable<Glass | undefined> {
		return of(MockedGlasses[ 0 ]);
	}

	public updateGlass(): void {}

	public removeGlass(): void {}
}
