import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { take } from 'rxjs/operators';
import { getDrink, getDrinks, getGlass, getGlasses, getIngredient, getIngredients } from '../store';
import * as ingredientsActions from '../store/ingredients/actions';
import * as drinksActions from '../store/drinks/actions';
import * as glassesActions from '../store/glasses/actions';
import { AppRootState } from '../../core/state';
import { DrinkRecipe, Glass, Ingredient } from '../../core/models/visualisation';

@Injectable()
export class StoreService {

	constructor( private store: Store<AppRootState>) {
	}

	// DRINKS
	public loadDrinks(): void {
		this.store.dispatch(new drinksActions.LoadDrinks());
	}

	public getDrinks(): Observable<DrinkRecipe[]> {
		return this.store.select(getDrinks);
	}

	public addDrink( recipe: DrinkRecipe ): void {
		this.store.dispatch(new drinksActions.AddDrink(recipe));
	}

	public getDrink( id: string ): Observable<DrinkRecipe | undefined> {
		return this.store.select(getDrink(id)).pipe(take(1));
	}

	public updateDrink( drink: DrinkRecipe ): void {
		this.store.dispatch(new drinksActions.UpdateDrink(drink));
	}

	public removeDrink( drink: DrinkRecipe ): void {
		this.store.dispatch(new drinksActions.RemoveDrink(drink));
	}

	// INGREDIENTS
	public loadIngredients(): void {
		this.store.dispatch(new ingredientsActions.LoadIngredients());
	}

	public getIngredients(): Observable<Ingredient[]> {
		return this.store.select(getIngredients);
	}

	public addIngredient( ingredient: Ingredient ): void {
		this.store.dispatch(new ingredientsActions.AddIngredient(ingredient));
	}

	public getIngredient( id: string ): Observable<Ingredient | undefined> {
		return this.store.select(getIngredient(id)).pipe(take(1));
	}

	public updateIngredient( ingredient: Ingredient ): void {
		this.store.dispatch(new ingredientsActions.UpdateIngredient(ingredient));
	}

	public removeIngredient( ingredient: Ingredient ): void {
		this.store.dispatch(new ingredientsActions.RemoveIngredient(ingredient));
	}

	// GLASSES

	public loadGlasses(): void {
		this.store.dispatch(new glassesActions.LoadGlasses());
	}

	public getGlasses(): Observable<Glass[]> {
		return this.store.select(getGlasses);
	}

	public addGlass( glass: Glass ): void {
		this.store.dispatch(new glassesActions.AddGlass(glass));
	}

	public getGlass( id: string ): Observable<Glass | undefined> {
		return this.store.select(getGlass(id)).pipe(take(1));
	}

	public updateGlass( glass: Glass ): void {
		this.store.dispatch(new glassesActions.UpdateGlass(glass));
	}

	public removeGlass( glass: Glass ): void {
		this.store.dispatch(new glassesActions.RemoveGlass(glass));
	}
}
