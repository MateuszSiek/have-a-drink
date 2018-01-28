export interface Glass {
  id: number;
  name: string;
  path: string;
  mask: string;
  maskTopMargin: number;
  maskHeight: number;
}

export interface DrinkRecipe {
  id: number;
  name: string;
  glassId: number;
  glass?: Glass;
  ingredientsIds: number[];
  ingredients?: Ingredient[];
}

export interface IngredientDef {
  id: number;
  name: string;
  colour: string;
}

export interface Ingredient extends IngredientDef {
  amount: number;
}
