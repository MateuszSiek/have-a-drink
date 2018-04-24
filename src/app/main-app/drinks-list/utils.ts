import { Filters } from './drinks-list.component';
import { DrinkRecipe, Ingredient } from '../../core/models/visualisation';

/*
 * function returns filtered drinks
 * When filter query specified drinks are filtered by name
 * Eg: filters = {query: 'test'}
 *
 * When filter types defined drinks are filtered based on alcohol type that can be found in their ingredients
 * When using alcohol type filter object with all alcohols need to be provided and only alcoholic drinks are returned
 * Eg: filters = {types: {vodka: true, champagne: false, whisky: true}}
 */
export function getFilteredDrinks( allDrinks: DrinkRecipe[], filters: Filters ): DrinkRecipe[] {
	const drinkName = filters.query;
	const alcoholsToFilterBy: string[] | undefined = filters.types && getAlcoholsToFilterBy(filters.types);
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
	// if undefined and type filters defined then all filters are off so return empty list
	if ( alcoholsToFilterBy === undefined && filters.types ) {
		filteredDrinks = [];
	}
	return filteredDrinks;
}

/*
 * Function returns true in one of drinks ingredients contains any given alcohol type
 */
export function containsAlcoholType( d: DrinkRecipe, types: string[] ): boolean {
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

/*
 * Function returns types of alcohols found in drinks ingredients
 *
 * Eg when providing drink which contains ingredient with properties `type='vodka' and `alcohol=true`
 * function will return array with that type: `['vodka']`
 */
export function getAlcoholTypes( drinks: DrinkRecipe[] ): string[] {
	const types = drinks
	.reduce(( i: Ingredient[], d: DrinkRecipe ) => [ ...i, ...d.ingredients ], []) // get only ingredients
	.filter(( i: Ingredient ) => i.alcohol && i.type && i.type.length) // get only alcohol with type
	.map(( i: Ingredient ) => i.type); // get only types

	return Array.from(new Set(types as string[])); // create array with unique values
}

/*
 * retrns array of alcohols that we want to display
 * For `types = { vodka: true, whisky: false }` function should return `[ 'vodka' ]`
 *
 * When all types set to true empty array is returned which means that we want to display all alcohols
 * `types = { vodka: true, whisky: true }` returns `[]`
 *
 * When all alcohols set to false function returns false which means that we should hide all alcohols
 */
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