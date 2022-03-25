import {
  createRounds,
  getAllRounds,
  getRoundMatchesQty,
  getRoundName,
  shouldHaveLoserBranch,
} from '../../playOffs/round';
import { E_PLAY_OFFS_ROUND } from '../../playOffs/types';
import { getNextChar, getNextRoundBranchChar } from '../../utils/generators';

describe('round name', () => {
  it('get final', () => {
    expect(getRoundName(1)).toEqual(E_PLAY_OFFS_ROUND.FINAL);
    expect(getRoundName(2)).toEqual(E_PLAY_OFFS_ROUND.FINAL);
  });

  it('get semi final', () => {
    expect(getRoundName(3)).toEqual(E_PLAY_OFFS_ROUND.SEMI_FINAL);
    expect(getRoundName(4)).toEqual(E_PLAY_OFFS_ROUND.SEMI_FINAL);
  });

  it('get quarter final', () => {
    expect(getRoundName(5)).toEqual(E_PLAY_OFFS_ROUND.QUARTER_FINAL);
    expect(getRoundName(8)).toEqual(E_PLAY_OFFS_ROUND.QUARTER_FINAL);
  });

  it('get 1/16', () => {
    expect(getRoundName(9)).toEqual('1/16');
    expect(getRoundName(16)).toEqual('1/16');
  });

  it('get 1/32', () => {
    expect(getRoundName(17)).toEqual('1/32');
    expect(getRoundName(32)).toEqual('1/32');
  });
});

describe('round matches qty', () => {
  it('get final matches qty', () => {
    expect(getRoundMatchesQty(E_PLAY_OFFS_ROUND.FINAL)).toEqual(1);
  });

  it('get semi final matches qty', () => {
    expect(getRoundMatchesQty(E_PLAY_OFFS_ROUND.SEMI_FINAL)).toEqual(2);
  });

  it('get quarter final matches qty', () => {
    expect(getRoundMatchesQty(E_PLAY_OFFS_ROUND.QUARTER_FINAL)).toEqual(4);
  });

  it('get 1/16 matches qty', () => {
    expect(getRoundMatchesQty('1/16')).toEqual(8);
  });

  it('get 1/32 matches qty', () => {
    expect(getRoundMatchesQty('1/32')).toEqual(16);
  });
});

describe('round branch char', () => {
  it('get next char', () => {
    expect(getNextChar()).toEqual('B');
    expect(getNextChar('B')).toEqual('C');
    expect(getNextChar('C')).toEqual('D');
  });
  it('get next char', () => {
    expect(getNextRoundBranchChar()).toEqual(undefined);
    expect(getNextRoundBranchChar('B')).toEqual('C');
    expect(getNextRoundBranchChar('C')).toEqual('E');
    expect(getNextRoundBranchChar('D')).toEqual('G');
  });
});

describe('rounds bracket', () => {
  it('create rounds array', () => {
    const rounds = createRounds(3)(E_PLAY_OFFS_ROUND.QUARTER_FINAL)();
  });
});

describe('shouldHaveLoserBranch', () => {
  it('shouldHaveLoserBranch QUARTER_FINAL', () => {
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(1)()).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(3)()).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(5)()).toEqual(true);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(7)()).toEqual(true);

    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(9)('B')).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(11)('B')).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(13)('B')).toEqual(true);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.QUARTER_FINAL)(15)('B')).toEqual(true);
  });
  it('shouldHaveLoserBranch SEMNI_FINALS', () => {
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.SEMI_FINAL)(1)()).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.SEMI_FINAL)(3)()).toEqual(true);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.SEMI_FINAL)(5)('B')).toEqual(false);
    expect(shouldHaveLoserBranch(E_PLAY_OFFS_ROUND.SEMI_FINAL)(7)('B')).toEqual(true);
  });
});

describe('getAllRounds', () => {
  it('getAllRounds with enum', () => {
    expect(getAllRounds(E_PLAY_OFFS_ROUND.QUARTER_FINAL)).toEqual([
      E_PLAY_OFFS_ROUND.FINAL,
      E_PLAY_OFFS_ROUND.SEMI_FINAL,
      E_PLAY_OFFS_ROUND.QUARTER_FINAL,
    ]);
  });
  it('getAllRounds with over QF', () => {
    expect(getAllRounds('1/32')).toEqual([
      E_PLAY_OFFS_ROUND.FINAL,
      E_PLAY_OFFS_ROUND.SEMI_FINAL,
      E_PLAY_OFFS_ROUND.QUARTER_FINAL,
      '1/16',
      '1/32',
    ]);
  });
});
