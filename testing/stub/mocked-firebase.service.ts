import { of } from 'rxjs/observable/of';
import { MockedGlasses } from '../fixtures/glasses';
import { MockedIngredients } from '../fixtures/ingredients';
import { MockedDrinks } from '../fixtures/drinks';
import { User } from 'firebase/app';
import { DrinkRecipe, Glass, Ingredient } from '../../src/app/core/models/visualisation';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { mapDrinkRecipeToFirebase } from '../../src/app/core/services/firebase.service';

export class MockFirebaseService {
	/*
	 * AUTH
	 */
	public getAuthState(): Observable<User | null> {
		return of(null);
	}

	public login( email: string, password: string ): Promise<any> {
		return new Promise(( resolve ) => resolve());
	}

	public signOut(): void {
	}


	// GLASSES
	public getGlasses(): Observable<Glass[]> {
		return of(MockedGlasses);
	}


	public addGlass(): void {
	}

	public removeGlass(): void {
	}

	public updateGlass(): void {
	}

	// INGREDIENTS
	public getIngredients(): Observable<Ingredient[]> {
		return of(MockedIngredients);
	}

	public addIngredient(): void {
	}

	public removeIngredient(): void {
	}

	public updateIngredient(): void {
	}

	// DRINKS
	public getDrinks(): Observable<DrinkRecipe[]> {
		return of(MockedDrinks);
	}

	public addDrink(): void {}

	public removeDrink(): void {}

	public updateDrink(): void {}
}