import { containsAlcoholType, getAlcoholsToFilterBy, getAlcoholTypes, getFilteredDrinks, matchInString } from './utils';
import { MockedDrinks } from '../../../../testing/fixtures/drinks';
import { Filters } from './drinks-list.component';

describe('DrinksList utils', () => {
	describe('#getFilteredDrinks', () => {
		it('should filter drinks by name', () => {
			expect(getFilteredDrinks(MockedDrinks, { query: 'oran' })).toEqual([ MockedDrinks[ 1 ] ]);
			expect(getFilteredDrinks(MockedDrinks, { query: 'wh' })).toEqual([ MockedDrinks[ 2 ] ]);
			expect(getFilteredDrinks(MockedDrinks, { query: '' })).toEqual(MockedDrinks);
			expect(getFilteredDrinks(MockedDrinks, { query: 'qeqwrqwe' })).toEqual([]);
			expect(getFilteredDrinks(MockedDrinks, {} as Filters)).toEqual(MockedDrinks);
		});

		it('should filter drinks by alcohol type', () => {
			expect(getFilteredDrinks(MockedDrinks, {
				types: { vodka: true, whisky: false }
			})).toEqual([ MockedDrinks[ 0 ], MockedDrinks[ 1 ] ]);

			expect(getFilteredDrinks(MockedDrinks, {
				types: { vodka: false, whisky: true }
			})).toEqual([ MockedDrinks[ 2 ] ]);

			expect(getFilteredDrinks(MockedDrinks, {
				types: { vodka: false, whisky: false }
			})).toEqual([]);
		});

		it('should filter drinks by query and alcohol type', () => {
			expect(getFilteredDrinks(MockedDrinks, {
				query: 'vod', types: { vodka: true, whisky: false }
			})).toEqual([ MockedDrinks[ 0 ] ]);

			expect(getFilteredDrinks(MockedDrinks, {
				query: 'vod', types: { vodka: false, whisky: true }
			})).toEqual([]);
		});
	});

	it('#containsAlcoholType should return boolean', () => {
		expect(containsAlcoholType(MockedDrinks[ 0 ], [ 'vodka' ])).toBeTruthy();
		expect(containsAlcoholType(MockedDrinks[ 0 ], [ 'vodka', 'whisky' ])).toBeTruthy();
		expect(containsAlcoholType(MockedDrinks[ 0 ], [ 'whisky' ])).toBeFalsy();
		expect(containsAlcoholType(MockedDrinks[ 2 ], [ 'whisky' ])).toBeTruthy();
	});

	it('#matchInString should return true if match in string found', () => {
		expect(matchInString('test', 'test')).toBeTruthy();
		expect(matchInString('test', 'te')).toBeTruthy();
		expect(matchInString('test', 'es')).toBeTruthy();
		expect(matchInString('test', 'xyz')).toBeFalsy();
	});

	it('#getAlcoholTypes should return all alcohol types found in drinks', () => {
		expect(getAlcoholTypes([ MockedDrinks[ 0 ] ])).toEqual([ 'vodka' ]);
		expect(getAlcoholTypes([ MockedDrinks[ 0 ] ]).length).toEqual(1);

		expect(getAlcoholTypes(MockedDrinks)).toEqual([ 'vodka', 'whisky' ]);
		expect(getAlcoholTypes(MockedDrinks).length).toEqual(2);

		expect(getAlcoholTypes([])).toEqual([]);
	});

	it('#getAlcoholsToFilterBy should return list of alcohols that we want to display', () => {
		expect(getAlcoholsToFilterBy({ vodka: true, whisky: false })).toEqual([ 'vodka' ]);

		// all true so no filtering, display all
		expect(getAlcoholsToFilterBy({ vodka: true, whisky: true })).toEqual([]);
		expect(getAlcoholsToFilterBy({ vodka: true, whisky: false, rum: true })).toEqual([ 'vodka', 'rum' ]);

		expect(getAlcoholsToFilterBy({ vodka: false, whisky: false })).toEqual(undefined);
	});
});
