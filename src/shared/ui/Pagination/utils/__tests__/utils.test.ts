import { generatePagesArray, getPagesRange } from '..';

describe('generatePagesArray', () => {
  it('should work correctly', () => {
    expect(generatePagesArray(1, 2)).toEqual([1]);
    expect(generatePagesArray(1, 5)).toEqual([1, 2, 3, 4]);
    expect(generatePagesArray(5, 8)).toEqual([5, 6, 7]);
    expect(generatePagesArray(1, 1)).toEqual([]);
  });
});

describe('getPagesRange', () => {
  it('should work correctly', () => {
    expect(getPagesRange(1, 10, 2)).toEqual([1, 2, 3, 4, 5]);
    expect(getPagesRange(5, 10, 2)).toEqual([3, 4, 5, 6, 7]);
    expect(getPagesRange(8, 10, 2)).toEqual([6, 7, 8, 9, 10]);
    expect(getPagesRange(10, 10, 2)).toEqual([6, 7, 8, 9, 10]);
  });
});
