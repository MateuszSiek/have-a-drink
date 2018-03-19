export interface Glass {
	id: string;
	name: string;
	path: string;
	mask: string;
	maskTopMargin: number;
	maskHeight: number;
}

export interface DrinkRecipe {
	id: string;
	name: string;
	description: string;
	active: boolean;
	glass: Glass;
	ingredients: Ingredient[];
	ingredientsAmount: { [key: string]: number };
}

export interface Ingredient {
	id: string;
	name: string;
	colour: string;
	alcohol: boolean;
	type: string; // eg gin, vodka, juice etc
}
