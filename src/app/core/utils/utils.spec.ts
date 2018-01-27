import { getNextInArray, getPrevInArray } from './utils';
import { getNextTestCases, getPrevTestCases } from '../../../../testing/fixtures/utils-test-cases';

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
});
