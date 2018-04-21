export const arrayOfNumbers: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
export const arrayOfObjects: { key: string, value: string }[] = [
	{ key: 'key 1', value: 'value 1' },
	{ key: 'key 2', value: 'value 2' },
	{ key: 'key 3', value: 'value 3' },
	{ key: 'key 4', value: 'value 4' },
	{ key: 'key 5', value: 'value 5' },
];

export const getNextTestCases: any[] = [
	{ input: [ arrayOfNumbers, 2 ], expect: 3 },
	{ input: [ arrayOfNumbers, 1 ], expect: 2 },
	{ input: [ arrayOfNumbers, 8 ], expect: 9 },
	{ input: [ arrayOfNumbers, 9 ], expect: 1 },
	{ input: [ arrayOfNumbers, 11 ], expect: undefined },
	{ input: [ arrayOfNumbers, 10 ], expect: undefined },
	{ input: [ arrayOfObjects, arrayOfObjects[ 0 ] ], expect: arrayOfObjects[ 1 ] },
	{ input: [ arrayOfObjects, arrayOfObjects[ 4 ] ], expect: arrayOfObjects[ 0 ] },
	{ input: [ arrayOfObjects, arrayOfObjects[ 5 ] ], expect: undefined },
	{ input: [ arrayOfObjects, arrayOfObjects[ 0 ], 'key' ], expect: { key: 'key 2', value: 'value 2' } },
	{ input: [ arrayOfObjects, arrayOfObjects[ 4 ], 'key' ], expect: { key: 'key 1', value: 'value 1' } },
	{ input: [ arrayOfObjects, { key: 'key 11' }, 'key' ], expect: undefined },
];

export const getPrevTestCases: any[] = [
	{ input: [ arrayOfNumbers, 2 ], expect: 1 },
	{ input: [ arrayOfNumbers, 9 ], expect: 8 },
	{ input: [ arrayOfNumbers, 1 ], expect: 9 },
	{ input: [ arrayOfNumbers, 0 ], expect: undefined },
	{ input: [ arrayOfNumbers, 11 ], expect: undefined },
	{ input: [ arrayOfNumbers, 10 ], expect: undefined },
	{ input: [ arrayOfObjects, arrayOfObjects[ 0 ] ], expect: arrayOfObjects[ 4 ] },
	{ input: [ arrayOfObjects, arrayOfObjects[ 4 ] ], expect: arrayOfObjects[ 3 ] },
	{ input: [ arrayOfObjects, arrayOfObjects[ 5 ] ], expect: undefined },
	{ input: [ arrayOfObjects, arrayOfObjects[ 0 ], 'key' ], expect: { key: 'key 5', value: 'value 5' } },
	{ input: [ arrayOfObjects, arrayOfObjects[ 4 ], 'key' ], expect: { key: 'key 4', value: 'value 4' } },
	{ input: [ arrayOfObjects, { key: 'key 11' }, 'key' ], expect: undefined },
];
