export function* iterator(initI: number): Generator<number> {
  let i = initI ?? 0;
  while (true) {
    yield i++;
  }
}

export function* power2iterator(initI: number): Generator<number> {
  let i = initI ?? 0;
  while (true) {
    yield i ** 2;
  }
}

const CAPITAL_LETTER_FIRST_LETTER = 65;

export const getNextRoundBranchChar = (branch?: string) => {
  const x = getBranchIterationCode(branch);
  if (x === 0) return String.fromCharCode(CAPITAL_LETTER_FIRST_LETTER);
  return String.fromCharCode(x * 2 + CAPITAL_LETTER_FIRST_LETTER);
};

export const getNextChar = (branch?: string) =>
  String.fromCharCode(branch ? branch.charCodeAt(0) + 1 : CAPITAL_LETTER_FIRST_LETTER + 1);

const getCharNumber = (b?: string) => b?.charCodeAt(0) ?? CAPITAL_LETTER_FIRST_LETTER;
export const getBranchIterationCode = (branch?: string) => getCharNumber(branch) - CAPITAL_LETTER_FIRST_LETTER;
