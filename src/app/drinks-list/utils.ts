import { DrinkRecipe, Ingredient } from '../core/models/visualisation';
import { Filters } from './drinks-list.component';

export function getFilteredDrinks( allDrinks: DrinkRecipe[], filters: Filters ): DrinkRecipe[] {
	const drinkName = filters.query;
	const alcoholsToFilterBy: string[] | undefined = getAlcoholsToFilterBy(filters.types);
	const filterByName: boolean = !!(drinkName && drinkName.length);
	const filterByType: boolean = !!(alcoholsToFilterBy && alcoholsToFilterBy.length);
	let filteredDrinks = allDrinks;

	// if query available filter drinks otherwise return full list
	if ( filterByName ) {
		filteredDrinks = filteredDrinks.filter(( d: DrinkRecipe ) => matchInString(d.name, drinkName!));
	}
	if ( filterByType ) {
		filteredDrinks = filteredDrinks.filter(( d: DrinkRecipe ) => containsAlcoholType(d, alcoholsToFilterBy!));
	}
	if ( alcoholsToFilterBy === undefined ) { // if undefined then all filters are off so return empty list
		filteredDrinks = [];
	}
	return filteredDrinks;
}

function containsAlcoholType( d: DrinkRecipe, types: string[] ): boolean {
	let contains: boolean = false;
	types.forEach(( type: string ) => {
		if ( !!d.ingredients.find(( i: Ingredient ) => i.type === type) ) {
			contains = true;
		}
	});
	return contains;
}


export function matchInString( string: string, match: string ): boolean {
	return !!(string.match(new RegExp(match, 'gi')));
}

export function getAlcoholTypes( drinks: DrinkRecipe[] ): string[] {
	const types = drinks
	.reduce(( i: Ingredient[], d: DrinkRecipe ) => [ ...i, ...d.ingredients ], []) // get only ingredients
	.filter(( i: Ingredient ) => i.alcohol && i.type && i.type.length) // get only alcohol with type
	.map(( i: Ingredient ) => i.type); // get only types

	return Array.from(new Set(types)); // create array with unique values
}

export function getAlcoholsToFilterBy( types: { [key: string]: boolean } ): string[] | undefined {
	const fieldsToFilterBy: string[] = [];
	const filterKeys = Object.keys(types);
	filterKeys.forEach(( v: string ) => {
		if ( types[ v ] ) {
			fieldsToFilterBy.push(v);
		}
	});
	if ( !fieldsToFilterBy.length ) {
		return undefined;
	}
	// if number of fields to filter by is the same as all fields then return empty array so no filtering
	return fieldsToFilterBy.length === filterKeys.length ? [] : fieldsToFilterBy;
}