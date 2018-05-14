import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { SnapshotAction } from 'angularfire2/database/interfaces';

import { DrinkRecipe, Glass, Ingredient, IngredientAmout } from '../models/visualisation';
import { User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { map, take } from 'rxjs/operators';

type FBGLass = Glass;
type FBIngredient = Ingredient;

interface FBDrink {
	id?: string;
	active: boolean;
	name: string;
	type: string;
	description: string;
	glass: { [key: string]: Glass };
	ingredients: { [key: string]: FBIngredient };
	ingredientsAmount: { [key: string]: IngredientAmout };
}

@Injectable()
export class FirebaseService {
	private glassesRef: AngularFireList<FBGLass>;
	private ingredientsRef: AngularFireList<FBIngredient>;
	private drinksRef: AngularFireList<FBDrink>;
	private drinks: DrinkRecipe[] = [];
	private drinksIds: string[] = [];

	private authState: User | null | undefined;

	constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth ) {
		this.glassesRef = db.list('glasses');
		this.ingredientsRef = db.list('ingredients');
		this.drinksRef = db.list('drinks');
		this.afAuth.authState.subscribe(( auth: User | null ) => {
			this.authState = auth;
		});
	}

	/*
	 * AUTH
	 */
	public getAuthState(): Observable<User | null> {
		return this.afAuth.authState;
	}

	public login( email: string, password: string ): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	public signOut(): Promise<any> {
		return this.afAuth.auth.signOut();
	}


	// GLASSES
	public getGlasses(): Observable<Glass[]> {
		return this.glassesRef.snapshotChanges().pipe(
			map(( changes: SnapshotAction[] ) => {
				return changes.map(c => ({ ...c.payload.val(), id: c.payload.key }))
				.sort(( a: Glass, b: Glass ) => a.name > b.name ? 1 : -1);
			})
		);
	}


	public addGlass( glass: Glass ): void {
		this.glassesRef.push(glass).then(() => {}, ( err ) => {alert('Save failed, error: ' + err); });
	}

	public removeGlass( glass: Glass ): void {
		this.glassesRef.remove(glass.id);
	}

	public updateGlass( glass: Glass ): void {
		const updateObject = { [ `glasses/${glass.id}` ]: glass, };
		const findDrinks = this.drinks.filter(( d: DrinkRecipe ) => d.glass && d.glass.id === glass.id);
		findDrinks.forEach(( d: DrinkRecipe ) => {
			updateObject[ `drinks/${d.id}/glass/${glass.id}` ] = glass;
		});
		this.db.database.ref().update(updateObject).catch(err => alert('Save failed, error: ' + err));
	}

	// INGREDIENTS
	public getIngredients(): Observable<Ingredient[]> {
		return this.ingredientsRef.snapshotChanges().pipe(
			map(( changes: SnapshotAction[] ) => {
				return changes.map(c => ({ ...c.payload.val(), id: c.payload.key }));
			})
		);
	}

	public addIngredient( ingredient: Ingredient ): void {
		this.ingredientsRef.push(ingredient).then(() => {}, ( err ) => alert('Save failed, error: ' + err));
	}

	public removeIngredient( ingredient: Ingredient ): void {
		this.ingredientsRef.remove(ingredient.id);
	}

	public updateIngredient( ingredient: Ingredient ): void {
		const updateObject = { [ `ingredients/${ingredient.id}` ]: ingredient, };
		const findDrinks = this.drinks.filter(( d: DrinkRecipe ) => {
			return !!d.ingredients.find(( i: Ingredient ) => i.id === ingredient.id);
		});
		findDrinks.forEach(( d: DrinkRecipe ) => {
			updateObject[ `drinks/${d.id}/ingredients/${ingredient.id}` ] = ingredient;
		});
		this.db.database.ref().update(updateObject).catch(err => alert('Save failed, error: ' + err));
	}

	// DRINKS
	public getDrinks(): Observable<DrinkRecipe[]> {
		return this.drinksRef.snapshotChanges().pipe(
			take(1),
			map(( changes: SnapshotAction[] ) => {
				this.drinksIds = [];
				return changes.map(( c: SnapshotAction ) => {
					const ingredients = Object.values(c.payload.child('ingredients').val());
					const glass = Object.values(c.payload.child('glass').val())[ 0 ];
					const id = c.payload.key || '';
					const drink = { ...c.payload.val(), id, ingredients, glass };
					this.drinksIds.push(id);
					this.drinks.push(drink as DrinkRecipe);
					return drink;
				});
			})
		);
	}

	public addDrink( recipe: DrinkRecipe ): void {
		this.drinksRef.push(mapDrinkRecipeToFirebase(recipe)).then(() => {}, ( err ) => {alert('Save failed, error: ' + err); });
	}

	public removeDrink( recipe: DrinkRecipe ): void {
		this.drinksRef.remove(recipe.id);
	}

	public updateDrink( recipe: DrinkRecipe ): void {
		const id = recipe.id;
		if ( id ) {
			this.drinksRef.update(id, mapDrinkRecipeToFirebase(recipe))
			.catch(( err: any ) => alert('Save failed, error: ' + err));
		}
	}

}

export function mapDrinkRecipeToFirebase( recipe: DrinkRecipe ): FBDrink {
	return {
		...recipe,
		glass      : { [ recipe.glass!.id as string ]: recipe.glass as Glass },
		ingredients: recipe.ingredients.reduce(( obj: { [key: string]: FBIngredient }, i: Ingredient ) => {
			obj[ i.id as string ] = i;
			return obj;
		}, {})
	};
}
