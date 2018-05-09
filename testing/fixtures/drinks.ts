import { MockedGlasses } from './glasses';
import { MockedIngredients } from './ingredients';
import { DrinkRecipe, DrinkTypeLabels, TypesOfDrinks } from '../../src/app/core/models/visualisation';

export const MockedDrinks: DrinkRecipe[] = [
	{
		id               : '-L5Zi08-X-uFyEkafIvt',
		name             : 'vodka-drink',
		active           : true,
		type             : DrinkTypeLabels[ TypesOfDrinks.AFTER_DINNER ],
		glass            : MockedGlasses[ 0 ],
		description      : 'qwerty',
		ingredients      : [
			{
				...MockedIngredients[ 0 ],
			},
			{
				...MockedIngredients[ 2 ],
			},
			{
				...MockedIngredients[ 1 ],
			},
		],
		ingredientsAmount: {
			[ MockedIngredients[ 0 ].id as string ]: { amount: 1, customAmount: '' },
			[ MockedIngredients[ 2 ].id as string ]: { amount: 1, customAmount: '' },
			[ MockedIngredients[ 1 ].id as string ]: { amount: 1, customAmount: '' },
		}
	},
	{
		id               : '-L5Zi5qZnWYjBNLDL9Sr',
		name             : 'orange',
		active           : true,
		type             : DrinkTypeLabels[ TypesOfDrinks.AFTER_DINNER ],
		glass            : MockedGlasses[ 0 ],
		description      : 'qwerty',
		ingredients      : [
			{
				...MockedIngredients[ 0 ],
			},
			{
				...MockedIngredients[ 1 ],
			},
		],
		ingredientsAmount: {
			[ MockedIngredients[ 0 ].id  as string ]: { amount: 1, customAmount: '' },
			[ MockedIngredients[ 1 ].id  as string ]: { amount: 5, customAmount: '' },
		}
	},
	{
		id               : '-L55qZZi5qL5qZDL9Sr',
		name             : 'whisky',
		active           : true,
		type             : DrinkTypeLabels[ TypesOfDrinks.AFTER_DINNER ],
		glass            : MockedGlasses[ 0 ],
		description      : 'qwerty',
		ingredients      : [
			{
				...MockedIngredients[ 3 ],
			},
		],
		ingredientsAmount: {
			[ MockedIngredients[ 3 ].id  as string ]: { amount: 1, customAmount: '' },
		}
	}
];
