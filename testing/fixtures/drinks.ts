import { MockedGlasses } from './glasses';
import { MockedIngredients } from './ingredients';
import { DrinkRecipe } from '../../src/app/core/models/visualisation';

export const MockedDrinks: DrinkRecipe[] = [
	{
		id               : '-L5Zi08-X-uFyEkafIvt',
		name             : 'all',
		active           : true,
		glass            : MockedGlasses[ 0 ],
		description      : 'qwerty',
		ingredients      : [
			{
				...MockedIngredients[ 2 ],
			},
			{
				...MockedIngredients[ 1 ],
			},
		],
		ingredientsAmount: {
			[ MockedIngredients[ 2 ].id as string ]: 1,
			[ MockedIngredients[ 1 ].id as string ]: 1,
		}
	},
	{
		id               : '-L5Zi5qZnWYjBNLDL9Sr',
		name             : 'orange',
		active           : true,
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
			[ MockedIngredients[ 0 ].id  as string ]: 1,
			[ MockedIngredients[ 1 ].id  as string ]: 5,
		}
	}
];
