import { Id } from '../models/db';
import { initGroupMatch, TGame, TPlaceholderGameTeam } from '..';
import { TPromotionType, TRoundName } from './types';

export const createGame =  // TODO: Time
  (
    returnMatch?: true, // 1
  ) =>
  (
    roundName: TRoundName, // 2
  ) =>
  (
    homeGame?: TGame,
    awayGame?: TGame, // 5
  ) =>
  (
    gameNumber: number, // 3
  ) =>
  (
    promotionType: TPromotionType, // 4
  ) =>
  (branch?: string): TGame => {
    const match = initGroupMatch({
      roundName,
      branch,
      number: gameNumber,
      home: getOnlyTeam(homeGame?.match.homeTeam, homeGame?.match.awayTeam),
      away: getOnlyTeam(awayGame?.match.homeTeam, awayGame?.match.awayTeam),
      placeholderGame: {
        home: homeGame && setPlaceHolderGame(homeGame.gameNumber, homeGame.round, promotionType, homeGame.branch),
        away: awayGame && setPlaceHolderGame(awayGame.gameNumber, awayGame.round, promotionType, awayGame.branch),
      },
    });

    const rematch =
      returnMatch &&
      initGroupMatch({
        roundName,
        branch,
        number: gameNumber,
        home: getOnlyTeam(awayGame?.match.homeTeam, awayGame?.match.awayTeam),
        away: getOnlyTeam(homeGame?.match.homeTeam, homeGame?.match.awayTeam),
        placeholderGame: {
          home: awayGame && setPlaceHolderGame(awayGame.gameNumber, awayGame.round, promotionType, branch),
          away: homeGame && setPlaceHolderGame(homeGame.gameNumber, homeGame.round, promotionType, branch),
        },
      });

    return {
      gameNumber,
      round: roundName,
      branch,
      match,
      rematch,
    };
  };

const getOnlyTeam = (teamA?: Id, teamB?: Id): Id | undefined => {
  if (teamA === 'NO_TEAM' && teamB === 'NO_TEAM') {
    return 'NO_TEAM';
  }

  if (teamA === 'NO_TEAM') {
    return teamB;
  }

  if (teamB === 'NO_TEAM') {
    return teamA;
  }

  return undefined;
};

const setPlaceHolderGame = (
  gameNumber: TGame['gameNumber'],
  round: TGame['round'],
  promotionType: TPlaceholderGameTeam['promotionType'],
  branch?: string,
): TPlaceholderGameTeam => ({
  game: {
    gameNumber: gameNumber,
    roundName: round,
    branch,
  },
  promotionType,
});

export const createGameWithTeams =  // TODO: Time
  (
    roundName: TRoundName, // 2
    branch?: string,
  ) =>
  (
    homeTeamId: Id | 'NO_TEAM',
    awayTeamId: Id | 'NO_TEAM', // 4
  ) =>
  (
    gameNumber: number, // 3
  ) =>
  (
    returnMatch?: true, // 1
  ): TGame => ({
    gameNumber,
    round: roundName,
    match: initGroupMatch({
      // TODO: Change to not only group match
      roundName,
      branch,
      number: gameNumber,
      home: homeTeamId,
      away: awayTeamId,
    }),
    rematch:
      returnMatch &&
      initGroupMatch({
        roundName,
        branch,
        number: gameNumber,
        home: awayTeamId,
        away: homeTeamId,
      }),
  });
