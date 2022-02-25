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
