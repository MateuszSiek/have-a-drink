export class Glass {
	public readonly id?: string;
	public name: string = '';
	public path: string = '';
	public mask: string = '';
	public maskTopMargin: number = 0;
	public maskHeight: number = 0;

	constructor( id?: string ) {
		this.id = id;
	}
}

export class DrinkRecipe {
	public readonly id?: string;
	public active: boolean = false;
	public name: string = '';
	public description: string = '';
	public glass?: Glass;
	public ingredients: Ingredient[] = [];
	public ingredientsAmount: { [key: string]: number } = {};

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

