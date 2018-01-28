import { DrinkRecipe, Glass, Ingredient } from '../models/visualisation';
import { GLASS_DATA } from './glass';

export const DRINKS: DrinkRecipe[] = [
  {
    id         : 1,
    name       : 'qwerty',
    glass      : GLASS_DATA[ 0 ],
    ingredients: [
      { id: 1, name: 'lemon', amount: 0.1, colour: 'yellow' },
      { id: 1, name: 'water', amount: 0.2, colour: 'blue' },
      { id: 1, name: 'vodka', amount: 0.2, colour: 'red' },
    ]
  }, {
    id         : 2,
    name       : 'yqertw',
    glass      : GLASS_DATA[ 1 ],
    ingredients: [
      { id: 1, name: 'lemon', amount: 0.1, colour: 'yellow' },
      { id: 1, name: 'water', amount: 0.5, colour: 'blue' },
      { id: 1, name: 'orange', amount: 0.2, colour: 'orange' },
      { id: 1, name: 'vodka', amount: 0.15, colour: 'pink' },
    ]
  }, {
    id         : 3,
    name       : 'ryqertwq',
    glass      : GLASS_DATA[ 2 ],
    ingredients: [
      { id: 1, name: 'lemon', amount: 0.1, colour: 'yellow' },
      { id: 1, name: 'water', amount: 0.5, colour: 'blue' },
      { id: 1, name: 'orange', amount: 0.2, colour: 'orange' },
      { id: 1, name: 'vodka', amount: 0.15, colour: 'pink' },
      { id: 1, name: 'water', amount: 0.5, colour: 'blue' },
    ]
  }
];
