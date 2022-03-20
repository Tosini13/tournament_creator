import { TGame } from '../..';
import { createBracket, createInitTeamsArray } from '../../playOffs/createBracket';
import { createGame, createGameWithTeams } from '../../playOffs/games';
import { E_PLAY_OFFS_ROUND } from '../../playOffs/types';
import { teams } from '../../utils/mockData/teams';

describe('round name', () => {
  it('calc teams places', () => {
    const initialTeams = createInitTeamsArray([teams[0], teams[1], undefined, teams[2], teams[3], undefined]);
    expect(initialTeams).toEqual([teams[0], teams[1], 'NO_TEAM', teams[2], teams[3], 'NO_TEAM', 'NO_TEAM', 'NO_TEAM']);
  });

  it('basic bracket QF - SF - F without return matches!', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F without return matches and with undefined matches in QF3 and QF4', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], undefined, teams[4], teams[6]],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)('NO_TEAM', teams[4].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, 'NO_TEAM')(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F without return matches and with undefined matches in QF3 and QF4', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], undefined, teams[4], teams[6], teams[7]],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)('NO_TEAM', teams[4].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F with return matches only in QF', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      returnMatches: [true, false, false],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)(true);
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)(true);
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)(true);
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)(true);
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });
  it('basic bracket QF - SF - F with return matches only in SF', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      returnMatches: [false, true, false],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F with return matches only in F', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      returnMatches: [false, false, true],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F with return matches and with undefined matches in QF3 and QF4', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], undefined, teams[4], teams[6]],
      returnMatches: [true, true, true],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)(true);
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)(true);
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)('NO_TEAM', teams[4].id)(3)(true);
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, 'NO_TEAM')(4)(true);
    const SF1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });

  it('basic bracket QF - SF - F without return matches, but with lastPlace = 1', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, F]);
  });
  it('basic bracket QF - SF - F without return matches, but with lastPlace = 3', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      lastPlaceMatch: 3,
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();
    const FB = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('looser')('B');

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SF1, SF2, FB, F]);
  });

  it('basic bracket QF - SF - F without return matches, but with lastPlace = 5', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      lastPlaceMatch: 5,
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SFB1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('looser')('B');
    const SFB2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('looser')('B');
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();
    const FB = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('looser')('B');
    const FC = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SFB1, SFB2)(1)('winner')('C');

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SFB1, SFB2, FC, SF1, SF2, FB, F]);
  });
  it('basic bracket QF - SF - F without return matches, but with lastPlace = 7', () => {
    const bracket = createBracket({
      round: E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
      lastPlaceMatch: 7,
    });

    const QF1 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[0].id, teams[1].id)(1)();
    const QF2 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[2].id, teams[3].id)(2)();
    const QF3 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[4].id, teams[5].id)(3)();
    const QF4 = createGameWithTeams(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(teams[6].id, teams[7].id)(4)();
    const SFB1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('looser')('B');
    const SFB2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('looser')('B');
    const SF1 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
    const SF2 = createGame()(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
    const F = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();
    const FB = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('looser')('B');
    const FC = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SFB1, SFB2)(1)('winner')('C');
    const FD = createGame()(E_PLAY_OFFS_ROUND.FINAL)(SFB1, SFB2)(1)('looser')('D');

    expect(bracket).toEqual([QF1, QF2, QF3, QF4, SFB1, SFB2, FD, FC, SF1, SF2, FB, F]);
  });
});
