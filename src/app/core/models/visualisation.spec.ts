import { DrinkRecipe, Glass, Ingredient } from './visualisation';

describe('Visualisation models', () => {
	it('#Glass should initialise with default fields and ID', () => {
		expect(new Glass('glassID')).toEqual(
			jasmine.objectContaining<Glass>({
				id           : 'glassID',
				name         : '',
				path         : '',
				mask         : '',
			})
		);
	});

	it('#DrinkRecipe should initialise with default fields and ID', () => {
		expect(new DrinkRecipe('drinkID')).toEqual(
			jasmine.objectContaining<DrinkRecipe>({
				id               : 'drinkID',
				active           : false,
				name             : '',
				description      : '',
				ingredients      : [],
				ingredientsAmount: {}
			})
		);
	});

	it('#Ingredient should initialise with default fields and ID', () => {
		expect(new Ingredient('ingredientID')).toEqual(
			jasmine.objectContaining<Ingredient>({
				id     : 'ingredientID',
				alcohol: false,
				name   : '',
				colour : '#ffffff',
			})
		);
	});
});
