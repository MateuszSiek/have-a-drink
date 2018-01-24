export interface Glass {
  id: string;
  path: string;
  mask: string;
  maskTopMargin: number;
  maskHeight: number;
}

export interface DrinkRecipe {
  name: string;
  glass: Glass;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  amount: number;
  colour: string;
}
