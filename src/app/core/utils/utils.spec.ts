import { getNextInArray, getPrevInArray, removeObjectFromArray, updateObjectInArray } from './utils';
import { getNextTestCases, getPrevTestCases } from '../../../../testing/fixtures/utils-test-cases';

interface MockObject {
	id: number;
	a: string;
}

const objects: MockObject[] = [ { a: '1', id: 0 }, { a: '2', id: 1 }, { a: '7', id: 2 } ];
const numbers: number[] = [ 1, 2, 3, 4, 5 ];

describe('Utils', () => {
	it('#getNextInArray should return next argument from array or undefined', () => {
		getNextTestCases.forEach(( testCase: any ) => {
			const result = getNextInArray<number>(testCase.input[ 0 ], testCase.input[ 1 ], testCase.input[ 2 ]);
			expect(result).toEqual(testCase.expect);
		});
	});

	it('#getPrevInArray should return previous argument from array or undefined', () => {
		getPrevTestCases.forEach(( testCase: any ) => {
			const result = getPrevInArray<number>(testCase.input[ 0 ], testCase.input[ 1 ], testCase.input[ 2 ]);
			expect(result).toEqual(testCase.expect);
		});
	});

	describe('#updateObjectInArray should update object', () => {
		it('should update object', () => {
			const updated1 = updateObjectInArray<MockObject>(objects, { a: '66', id: 0 }, 'id');
			const updated2 = updateObjectInArray<MockObject>(objects, { a: '66', id: 7 }, 'id');
			expect(updated1.length).toEqual(objects.length);
			expect(updated1).toContain({ a: '66', id: 0 });
			expect(updated2.length).toEqual(objects.length);
			expect(updated2.length).not.toContain({ a: '66', id: 7 });
		});

	});
	describe('#removeObjectFromArray', () => {
		it('should remove base type', () => {
			expect(removeObjectFromArray<number>(numbers, 3)).toEqual([ 1, 2, 4, 5 ]);
			expect(removeObjectFromArray<number>(numbers, 1)).not.toContain(1);
			expect(removeObjectFromArray<number>(numbers, 8)).toEqual(numbers);
		});
		it('should remove object by..', () => {
			expect(removeObjectFromArray<MockObject>(objects, { a: '2', id: 1 }, 'a'))
			.toEqual([ { a: '1', id: 0 }, { a: '7', id: 2 } ]);
			expect(removeObjectFromArray<MockObject>(objects, { a: '8', id: 2 }, 'a')).toEqual(objects);
		});
	});
});
