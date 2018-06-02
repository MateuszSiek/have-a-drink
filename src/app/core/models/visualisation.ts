export class Glass {
	public readonly id?: string;
	public name: string = '';
	public path: string = '';
	public mask: string = '';

	constructor( id?: string ) {
		this.id = id;
	}
}

export interface IngredientAmout {
	amount: number;
	customAmount?: string;
}


export class DrinkRecipe {
	public readonly id?: string;
	public active: boolean = false;
	public name: string = '';
	public type: string = '';
	public description: string = '';
	public glass?: Glass;
	public ingredients: Ingredient[] = [];
	public ingredientsAmount: { [key: string]: IngredientAmout } = {};

	constructor( id?: string ) {
		this.id = id;
	}
}

export class Ingredient {
	public readonly id?: string;
	public alcohol: boolean = false;
	public name: string = '';
	public type?: string = ''; // eg gin, vodka, juice etc
	public colour: string = '#ffffff';

	constructor( id?: string ) {
		this.id = id;
	}
}

export enum TypesOfDrinks {
	AFTER_DINNER = 'AFTER_DINNER',
	BEFORE_DINNER = 'BEFORE_DINNER',
	ALL_DAY = 'ALL_DAY',
	LONG_DRINK = 'LONG_DRINK',
	SPARKLING = 'SPARKLING',
	HOT_DRINK = 'HOT_DRINK',
}

export const DrinkTypeLabels: { [ key in TypesOfDrinks ]: string } = {
	[TypesOfDrinks.AFTER_DINNER]: 'After Dinner Cocktail',
	[TypesOfDrinks.BEFORE_DINNER]: 'Before Dinner Cocktail',
	[TypesOfDrinks.ALL_DAY]: 'All Day Cocktail',
	[TypesOfDrinks.LONG_DRINK]: 'Longdrink',
	[TypesOfDrinks.SPARKLING]: 'Sparkling Cocktail',
	[TypesOfDrinks.HOT_DRINK]: 'Hot Drink',
};
