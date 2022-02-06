export function* iterator(initI: number): Generator<number> {
  let i = initI ?? 0;
  while (true) {
    yield i++;
  }
}
