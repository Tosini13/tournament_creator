import { getEvery2Elements } from './array';

const sameReturn = [
  [1, 2, 3, 0],
  [3, 4, 7, 1],
  [5, 6, 11, 2],
];
describe('array', () => {
  it('getEvery2Elements', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const map = getEvery2Elements(arr);
    const array = map((item1, item2, index) => [item1, item2, item1 + item2, index]);
    expect(array).toEqual(sameReturn);
  });

  it('getEvery2Elements', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(same(arr)).toEqual(sameReturn);
  });
});

const same = (arr: any[]) =>
  Array.from(Array(arr.length).keys())
    .filter((n) => n % 2 === 1)
    .map((i) => [arr[i - 1], arr[i], arr[i - 1] + arr[i], Math.floor(i / 2)]);
