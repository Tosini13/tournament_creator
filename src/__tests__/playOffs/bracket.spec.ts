import { TGame } from '../..';
import { createBracket, createInitTeamsArray } from '../../playOffs/createBracket';
import { createGame, createGameWithTeams } from '../../playOffs/games';
import { E_PLAY_OFFS_ROUND } from '../../playOffs/types';
import { teams } from '../../utils/mockData/teams';

describe('round name', () => {
  it('count teams places', () => {
    const teamsQty = createInitTeamsArray([teams[0], teams[1], undefined, teams[2], teams[3], undefined]);
    expect(teamsQty).toEqual([teams[0], teams[1], 'NO_TEAM', teams[2], teams[3], 'NO_TEAM', 'NO_TEAM', 'NO_TEAM']);
  });

  it('basic bracket QF - SF - F without return matches', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: createInitTeamsArray([teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]]),
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF1, QF2)(1)();
    const SF2 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF3, QF4)(2)();
    const F = createGame(E_PLAY_OFFS_ROUND.FINAL)('winner')(SF1, SF2)(1)();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F without return matches and with undefined matches in QF3 and QF4', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: createInitTeamsArray([teams[0], teams[1], teams[2], teams[3], undefined, teams[4], teams[6]]),
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)('NO_TEAM', teams[4].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, 'NO_TEAM')(4)();
    const SF1 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF1, QF2)(1)();
    const SF2 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF3, QF4)(2)();
    const F = createGame(E_PLAY_OFFS_ROUND.FINAL)('winner')(SF1, SF2)(1)();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F without return matches and with undefined matches in QF3 and QF4', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: createInitTeamsArray([teams[0], teams[1], teams[2], teams[3], undefined, teams[4], teams[6], teams[7]]),
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)('NO_TEAM', teams[4].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF1, QF2)(1)();
    const SF2 = createGame(E_PLAY_OFFS_ROUND.SEMI_FINAL)('winner')(QF3, QF4)(2)();
    const F = createGame(E_PLAY_OFFS_ROUND.FINAL)('winner')(SF1, SF2)(1)();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });
});
