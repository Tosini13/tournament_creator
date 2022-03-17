import { bergerAlgorithm } from '../utils/algorithms/berger';
import { Id } from '../models/db';
import { TCreateGroup, TGroup } from '../models/group';
import { TMatch } from '../models/match';
import { TTeam } from '../models/team';

type TCreateGroupProps = {
  name: string;
  teams: Id[];
  rematch?: boolean;
};

const createGroup = ({ name, teams, rematch }: TCreateGroupProps): TCreateGroup => {
  const groupMatches = createGroupMatches({
    teams,
    rematch,
  });

  return {
    name,
    teams,
    matches: groupMatches,
  };
};
export default createGroup;

type TCreateGroupMatchesProps = {
  teams: Id[];
  rematch?: boolean;
  revertedRematch?: boolean;
};
export const createGroupMatches = ({ teams, rematch, revertedRematch }: TCreateGroupMatchesProps): TMatch[] => {
  if (teams.length > 3) {
    const { matches, rounds } = bergerAlgorithm({ teams });
    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches, rounds })];
    }
    return matches;
  } else if (teams.length === 3) {
    const matches = [
      initGroupMatch({ home: teams[0], away: teams[1], round: 1, matchNumber: 1 }),
      initGroupMatch({ home: teams[1], away: teams[2], round: 2, matchNumber: 2 }),
      initGroupMatch({ home: teams[2], away: teams[0], round: 3, matchNumber: 3 }),
    ];

    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches, rounds: 3 })];
    }
    return matches;
  } else if (teams.length === 2) {
    const matches = [initGroupMatch({ home: teams[0], away: teams[1], round: 1, matchNumber: 1 })];
    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches, rounds: 1 })];
    }
    return matches;
  } else {
    return [];
  }
};

type TInitMatchProps = {
  home?: Id;
  away?: Id;
  round?: number;
  roundName?: TMatch['roundName'];
  branch?: string;
  matchNumber: number;
  placeholderGame?: TMatch['placeholderGame'];
};

export const initGroupMatch = ({
  home,
  away,
  round,
  roundName,
  branch,
  matchNumber,
  placeholderGame,
}: TInitMatchProps): TGroup['matches'][number] => {
  return {
    homeTeam: home,
    awayTeam: away,
    roundNumber: round,
    branch,
    roundName,
    matchNumber,
    placeholderGame,
  };
};

type TCreateGroupReMatchesProps = {
  matches: TMatch[];
  rounds: number;
};

const createGroupReMatches = ({ matches, rounds }: TCreateGroupReMatchesProps): TMatch[] => {
  return matches.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: match?.roundNumber && match?.roundNumber + rounds,
    matchNumber: i + 1 + matches.length,
  }));
};
