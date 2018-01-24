import { DrinkRecipe, Glass, Ingredient } from '../models/visualisation';
import { GLASS_DATA } from './glass';

export const DRINKS: DrinkRecipe[] = [
  {
    name       : 'Drink 1',
    glass      : GLASS_DATA[ 0 ],
    ingredients: [
      { name: 'lemon', amount: 0.1, colour: 'yellow' },
      { name: 'water', amount: 0.2, colour: 'blue' },
      { name: 'vodka', amount: 0.2, colour: 'red' },
    ]
  }, {
    name       : 'Drink 2',
    glass      : GLASS_DATA[ 1 ],
    ingredients: [
      { name: 'lemon', amount: 0.1, colour: 'yellow' },
      { name: 'water', amount: 0.5, colour: 'blue' },
      { name: 'orange', amount: 0.2, colour: 'orange' },
      { name: 'vodka', amount: 0.15, colour: 'pink' },
    ]
  }, {
    name       : 'Drink 3',
    glass      : GLASS_DATA[ 2 ],
    ingredients: [
      { name: 'lemon', amount: 0.1, colour: 'yellow' },
      { name: 'water', amount: 0.5, colour: 'blue' },
      { name: 'orange', amount: 0.2, colour: 'orange' },
      { name: 'vodka', amount: 0.15, colour: 'pink' },
      { name: 'water', amount: 0.5, colour: 'blue' },
    ]
  }
];
