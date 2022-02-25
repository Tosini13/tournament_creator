import { Id } from '../models/db';
import { initGroupMatch, TGame, TPlaceholderGameTeam } from '..';
import { TPromotionType, TRoundName } from './types';

export const createGame =  // TODO: Time
  (
    roundName: TRoundName, // 2
  ) =>
  (
    promotionType: TPromotionType, // 4
  ) =>
  (
    homeGame?: TGame,
    awayGame?: TGame, // 5
  ) =>
  (
    gameNumber: number, // 3
  ) =>
  (
    returnMatch?: true, // 1
  ): TGame => {
    const match = initGroupMatch({
      roundName,
      number: gameNumber,
      home: getOnlyTeam(homeGame?.match.homeTeam, homeGame?.match.awayTeam),
      away: getOnlyTeam(awayGame?.match.homeTeam, awayGame?.match.awayTeam),
      placeholderGame: {
        home: homeGame && setPlaceHolderGame(homeGame.gameNumber, homeGame.round, promotionType),
        away: awayGame && setPlaceHolderGame(awayGame.gameNumber, awayGame.round, promotionType),
      },
    });

    const rematch =
      returnMatch &&
      initGroupMatch({
        roundName,
        number: gameNumber,
        home: getOnlyTeam(awayGame?.match.homeTeam, awayGame?.match.awayTeam),
        away: getOnlyTeam(homeGame?.match.homeTeam, homeGame?.match.awayTeam),
        placeholderGame: {
          home: awayGame && setPlaceHolderGame(awayGame.gameNumber, awayGame.round, promotionType),
          away: homeGame && setPlaceHolderGame(homeGame.gameNumber, homeGame.round, promotionType),
        },
      });

    return {
      gameNumber,
      round: roundName,
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
): TPlaceholderGameTeam => ({
  game: {
    gameNumber: gameNumber,
    roundName: round,
  },
  promotionType,
});

export const createGameWithTeams =  // TODO: Time
  (
    roundName: TRoundName, // 2
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
      number: gameNumber,
      home: homeTeamId,
      away: awayTeamId,
    }),
    rematch:
      returnMatch &&
      initGroupMatch({
        roundName,
        number: gameNumber,
        home: awayTeamId,
        away: homeTeamId,
      }),
  });
