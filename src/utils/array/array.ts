const reducetoNextedArray = <TElement>(prev: TElement[][], current: TElement, i: number) => {
  if (i % 2) {
    return [...prev.slice(0, -1), [...prev.slice(-1)[0], current]];
  }
  return [...prev, [current]];
};
const init: any[][] = [];

export const getEvery2Elements =
  <TElement = any, TReturn = any>(arr: Array<TElement>) =>
  (fn: (item: TElement, item2: TElement, index: number) => TReturn) =>
    arr.reduce(reducetoNextedArray, init).map(([item1, item2], i) => fn(item1, item2, i));
