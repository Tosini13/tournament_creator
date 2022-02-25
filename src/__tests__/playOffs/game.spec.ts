import { TMatch } from '../..';
import { createGame, createGameWithTeams } from '../../playOffs/games';
import { E_PLAY_OFFS_ROUND } from '../../playOffs/types';
import { teams } from '../../utils/mockData/teams';

describe('game', () => {
  it('create game with teams', () => {
    const gameNumber = 1;
    const round = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const homeTeam = teams[0];
    const awayTeam = teams[1];
    const game = createGameWithTeams(round)(homeTeam.id, awayTeam.id)(gameNumber)();

    const match: TMatch = {
      matchNumber: gameNumber,
      homeTeam: homeTeam.id,
      awayTeam: awayTeam.id,
      roundName: round,
    };

    expect(game).toEqual({
      gameNumber,
      round,
      match,
    });
  });

  it('create game with teams with rematch', () => {
    const gameNumber = 2;
    const round = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const homeTeam = teams[0];
    const awayTeam = teams[1];
    const game = createGameWithTeams(round)(homeTeam.id, awayTeam.id)(gameNumber)(true);

    const match: TMatch = {
      matchNumber: gameNumber,
      homeTeam: homeTeam.id,
      awayTeam: awayTeam.id,
      roundName: round,
    };

    const rematch: TMatch = {
      matchNumber: gameNumber,
      homeTeam: awayTeam.id,
      awayTeam: homeTeam.id,
      roundName: round,
    };

    expect(game).toEqual({
      gameNumber,
      round,
      match,
      rematch,
    });
  });

  it('create game with games', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, teams[1].id)(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)(teams[0].id, teams[1].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)();

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
    });
  });

  it('create game with games with rematch', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, teams[1].id)(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)(teams[0].id, teams[1].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)(true);

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
      },
    };

    const rematch: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
      rematch,
    });
  });

  it('create game with games with one undefined home game team', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, 'NO_TEAM')(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)(teams[1].id, teams[2].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)();

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      homeTeam: teams[0].id,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
    });
  });

  it('create game with games with one undefined team and with rematch', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, 'NO_TEAM')(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)(teams[1].id, teams[2].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)(true);

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      homeTeam: teams[0].id,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
      },
    };

    const rematch: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      awayTeam: teams[0].id,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
      rematch,
    });
  });

  it('create game with games with one undefined away game team', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, teams[1].id)(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)('NO_TEAM', teams[2].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)();

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      awayTeam: teams[2].id,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: qf1.gameNumber,
            roundName: qf1.round,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: qf2.gameNumber,
            roundName: qf2.round,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
    });
  });

  it('create game with games with one undefined team in each previous game', () => {
    let gameNumber = 1;
    const firstRound = E_PLAY_OFFS_ROUND.QUARTER_FINAL;
    const nextRound = E_PLAY_OFFS_ROUND.SEMI_FINAL;
    const qf1 = createGameWithTeams(firstRound)(teams[0].id, 'NO_TEAM')(gameNumber++)();
    const qf2 = createGameWithTeams(firstRound)('NO_TEAM', teams[2].id)(gameNumber++)();
    const game = createGame(nextRound)('winner')(qf1, qf2)(gameNumber)();

    const match: TMatch = {
      matchNumber: gameNumber,
      roundName: nextRound,
      homeTeam: teams[0].id,
      awayTeam: teams[2].id,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: 1,
            roundName: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: 2,
            roundName: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
          },
        },
      },
    };

    expect(game).toEqual({
      gameNumber,
      round: nextRound,
      match,
    });
  });

  it('create FINAL game from QF games with one undefined team in one QF', () => {
    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, 'NO_TEAM')(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[1].id, teams[2].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[3].id, teams[4].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[5].id, teams[6].id)(4)();
    const SF1 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF1, QF2)(1)();
    const SF2 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF3, QF4)(2)();
    const F = createGame(E_PLAY_OFFS_ROUND.FINAL)('winner')(SF1, SF2)(1)();

    const match: TMatch = {
      matchNumber: 1,
      roundName: E_PLAY_OFFS_ROUND.FINAL,
      homeTeam: undefined,
      awayTeam: undefined,
      placeholderGame: {
        home: {
          promotionType: 'winner',
          game: {
            gameNumber: 1,
            roundName: E_PLAY_OFFS_ROUND.SEMI_FINAL,
          },
        },
        away: {
          promotionType: 'winner',
          game: {
            gameNumber: 2,
            roundName: E_PLAY_OFFS_ROUND.SEMI_FINAL,
          },
        },
      },
    };

    expect(F).toEqual({
      gameNumber: 1,
      round: E_PLAY_OFFS_ROUND.FINAL,
      match,
    });
  });
});
