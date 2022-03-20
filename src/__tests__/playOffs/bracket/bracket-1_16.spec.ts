import { createBracket, createInitTeamsArray } from '../../../playOffs/createBracket';
import { createGame, createGameWithTeams } from '../../../playOffs/games';
import { E_PLAY_OFFS_ROUND } from '../../../playOffs/types';
import { teams } from '../../../utils/mockData/teams';

const F_1_16_1 = createGameWithTeams('1/16')(teams[0].id, teams[1].id)(1)(true);
const F_1_16_2 = createGameWithTeams('1/16')(teams[2].id, teams[3].id)(2)(true);
const F_1_16_3 = createGameWithTeams('1/16')(teams[4].id, teams[5].id)(3)(true);
const F_1_16_4 = createGameWithTeams('1/16')(teams[6].id, teams[7].id)(4)(true);
const F_1_16_5 = createGameWithTeams('1/16')(teams[8].id, teams[9].id)(5)(true);
const F_1_16_6 = createGameWithTeams('1/16')(teams[10].id, teams[11].id)(6)(true);
const F_1_16_7 = createGameWithTeams('1/16')(teams[12].id, teams[13].id)(7)(true);
const F_1_16_8 = createGameWithTeams('1/16')(teams[14].id, teams[15].id)(8)(true);

const F_1_16s = [F_1_16_1, F_1_16_2, F_1_16_3, F_1_16_4, F_1_16_5, F_1_16_6, F_1_16_7, F_1_16_8];

const QFB1 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_1, F_1_16_2)(1)('looser')('B');
const QFB2 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_3, F_1_16_4)(2)('looser')('B');
const QFB3 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_5, F_1_16_6)(3)('looser')('B');
const QFB4 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_7, F_1_16_8)(4)('looser')('B');

const QFBs = [QFB1, QFB2, QFB3, QFB4];

const QF1 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_1, F_1_16_2)(1)('winner')();
const QF2 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_3, F_1_16_4)(2)('winner')();
const QF3 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_5, F_1_16_6)(3)('winner')();
const QF4 = createGame(true)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(F_1_16_7, F_1_16_8)(4)('winner')();
const QFs = [QF1, QF2, QF3, QF4];

const SFD1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QFB1, QFB2)(1)('looser')('D');
const SFD2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QFB3, QFB4)(2)('looser')('D');
const SFDs = [SFD1, SFD2];

const SFC1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QFB1, QFB2)(1)('winner')('C');
const SFC2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QFB3, QFB4)(2)('winner')('C');
const SFCs = [SFC1, SFC2];

const SFB1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('looser')('B');
const SFB2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('looser')('B');
const SFBs = [SFB1, SFB2];

const SF1 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF1, QF2)(1)('winner')();
const SF2 = createGame(true)(E_PLAY_OFFS_ROUND.SEMI_FINAL)(QF3, QF4)(2)('winner')();
const SFs = [SF1, SF2];

const F15 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFD1, SFD2)(1)('looser')('H');
const F13 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFD1, SFD2)(1)('winner')('G');

const F11 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFC1, SFC2)(1)('looser')('F');
const F9 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFC1, SFC2)(1)('winner')('E');

const F7 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFB1, SFB2)(1)('looser')('D');
const F5 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SFB1, SFB2)(1)('winner')('C');

const F3 = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('looser')('B');
const F = createGame(true)(E_PLAY_OFFS_ROUND.FINAL)(SF1, SF2)(1)('winner')();

it('basic bracket 1/16 - QF - SF - F without return matches, but with lastPlace = 15', () => {
  const bracket = createBracket({
    round: '1/16',
    teams: [
      teams[0],
      teams[1],
      teams[2],
      teams[3],
      teams[4],
      teams[5],
      teams[6],
      teams[7],
      teams[8],
      teams[9],
      teams[10],
      teams[11],
      teams[12],
      teams[13],
      teams[14],
      teams[15],
    ],
    lastPlaceMatch: 15,
    returnMatches: [true, true, true, true],
  });

  expect(bracket).toEqual([
    ...F_1_16s,
    ...QFBs,
    ...SFDs,
    F15,
    F13,
    ...SFCs,
    F11,
    F9,
    ...QFs,
    ...SFBs,
    F7,
    F5,
    ...SFs,
    F3,
    F,
  ]);
});
