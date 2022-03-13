import { getBranchIterationCode, getNextChar, getNextRoundBranchChar } from '../utils/generators';
import { E_PLAY_OFFS_ROUND, TRoundName } from './types';

export const getRoundName = (teamsQty: number): TRoundName => {
  let i = 2;
  while (i < teamsQty) {
    i *= 2;
  }
  switch (i) {
    case 2:
      return E_PLAY_OFFS_ROUND.FINAL;
    case 4:
      return E_PLAY_OFFS_ROUND.SEMI_FINAL;
    case 8:
      return E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    default:
      return `1/${i}`;
  }
};

export const getRoundMatchesQty = (round: TRoundName): number => {
  switch (round) {
    case E_PLAY_OFFS_ROUND.FINAL:
      return 1;
    case E_PLAY_OFFS_ROUND.SEMI_FINAL:
      return 2;
    case E_PLAY_OFFS_ROUND.QUARTER_FINAL:
      return 4;
    default:
      return Number(round.split('/')[1]) / 2;
  }
};

export const getNextRound = (round: TRoundName): TRoundName => getRoundName(getRoundMatchesQty(round));

export const shouldHaveLoserBranch =
  (round: TRoundName) =>
  (lastPlaceMatch: number = 1) =>
  (branch: string = 'A') => {
    const matchesQtt = getRoundMatchesQty(round); // QF = 4
    const codeI = getBranchIterationCode(branch); // A = 0

    const placesInBranchesAbove = codeI * matchesQtt * 2;
    return matchesQtt + placesInBranchesAbove < lastPlaceMatch;
  };

type TBracketRound = {
  roundName: TRoundName;
  branch: string;
};

const createRound =
  (round: TRoundName) =>
  (branch: string): TBracketRound => ({ roundName: round, branch });

export const createRounds =
  (lastPlaceMatch: number) =>
  (round: TRoundName) =>
  (branch: string = 'A') => {
    if (round === E_PLAY_OFFS_ROUND.FINAL) {
      return [createRound(round)(branch)];
    }
    const rounds: TBracketRound[] = [];
    const createRoundsOfBranch = createRounds(lastPlaceMatch)(getNextRound(round));
    if (shouldHaveLoserBranch(round)(lastPlaceMatch)(branch)) {
      const loserBranch = createRoundsOfBranch(getNextChar(getNextRoundBranchChar(branch)));
      rounds.push(...loserBranch);
    }
    const winnerBranch = createRoundsOfBranch(getNextRoundBranchChar(branch));
    rounds.push(...winnerBranch);
    return [createRound(round)(branch), ...rounds];
  };
