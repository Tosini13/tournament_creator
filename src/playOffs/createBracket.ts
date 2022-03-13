import { TGame, TTeam } from '..';
import { getNextChar, getNextRoundBranchChar } from '../utils/generators';
import { createGame, createGameWithTeams } from './games';
import { getNextRound, getRoundMatchesQty, shouldHaveLoserBranch } from './round';
import { E_PLAY_OFFS_ROUND, TReturnMatches, TRoundName } from './types';

export type TCreateBracketProps = {
  round: TRoundName;
  teams: Array<TTeam | 'NO_TEAM'>;
  returnMatches?: TReturnMatches;
  lastPlaceMatch?: number;
};

export const createBracket = ({ round, teams, returnMatches, lastPlaceMatch }: TCreateBracketProps) => {
  const genReturnMatches = getHasReturnMatch(returnMatches ?? []);
  const hasReturnMatch = genReturnMatches.next().value;
  const firstRoundGames = Array.from(Array(teams.length).keys())
    .filter((n) => n % 2)
    .map((i) =>
      createGameWithTeams(round)(getTeamId(teams[i - 1]), getTeamId(teams[i]))(Math.floor(i / 2) + 1)(hasReturnMatch),
    );
  return createGamesRound(genReturnMatches)(lastPlaceMatch)(getNextRound(round))(firstRoundGames)()(
    shouldHaveLoserBranch(round)(lastPlaceMatch)(),
  );
};

const getTeamId = (team: TTeam | 'NO_TEAM') => (team === 'NO_TEAM' ? 'NO_TEAM' : team.id);

// TODO: Create function that creates nested array with teams or games (generic)

export const createInitTeamsArray = (teams: Array<TTeam | undefined>): Array<TTeam | 'NO_TEAM'> =>
  [...teams, ...numArray(getBracketTeamsQty(teams.length) - teams.length).map(() => undefined)].map(
    (team) => team ?? 'NO_TEAM',
  );

const getBracketTeamsQty = (qty: number): number => {
  let i = 2;
  while (qty > i) {
    i *= 2;
  }
  return i;
};

const numArray = (n: number): number[] => Array.from(Array(n).keys());

function* getHasReturnMatch(returnMatches: boolean[]): TReturnMatchesGen {
  while (returnMatches.length > 0) {
    yield returnMatches.shift() || undefined;
  }
  return undefined;
}

export type TReturnMatchesGen = Generator<true | undefined, undefined, unknown>;

// ------ NEW:

export const createGamesRound =
  (genReturnMatches: TReturnMatchesGen) =>
  (lastPlaceMatch: number = 1) =>
  (roundName: TRoundName) =>
  (games: TGame[]) =>
  (branch?: string) =>
  (haveLoserBranch?: boolean): TGame[] => {
    const hasReturnMatch = genReturnMatches.next().value;
    // TODO: Add if should be only winner or looser as well: array with boolean and shift with each round
    // TODO: Add branch - A B C branch of the bracket
    const winnerGames = Array.from(Array(games.length).keys())
      .filter((n) => n % 2 === 1)
      .map((i) =>
        createGame(roundName, branch)('winner')(games[i - 1], games[i])(Math.floor(i / 2) + 1)(hasReturnMatch),
      );

    let loserGames: TGame[] = [];

    if (haveLoserBranch) {
      loserGames = Array.from(Array(games.length).keys())
        .filter((n) => n % 2 === 1)
        .map((i) =>
          createGame(roundName, getNextChar(branch))('looser')(games[i - 1], games[i])(Math.floor(i / 2) + 1)(
            hasReturnMatch,
          ),
        );
    }

    if (roundName === E_PLAY_OFFS_ROUND.FINAL) {
      return [...games, ...loserGames, ...winnerGames];
    }

    const nextWinnerGames = createGamesRound(genReturnMatches)(lastPlaceMatch)(getNextRound(roundName))(winnerGames)(
      getNextRoundBranchChar(branch),
    )(shouldHaveLoserBranch(roundName)(lastPlaceMatch)(branch));

    let nextLoserGames: TGame[] = [];
    if (loserGames.length) {
      nextLoserGames = createGamesRound(genReturnMatches)(lastPlaceMatch)(getNextRound(roundName))(loserGames)(
        getNextRoundBranchChar(getNextChar(branch)),
      )(shouldHaveLoserBranch(roundName)(lastPlaceMatch)(getNextChar(branch)));
    }

    return [...games, ...nextLoserGames, ...nextWinnerGames];
  };
