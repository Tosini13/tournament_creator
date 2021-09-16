import { bergerAlgorithm } from '../algorithms/berger';
import { TCreateGroup, TGroup } from '../models/group';
import { TMatch } from '../models/match';
import { TTeam } from '../models/team';

type TCreateGroupProps = {
  name: string;
  teams: TTeam[];
  rematch?: boolean;
};

export const createGroup = ({ name, teams, rematch }: TCreateGroupProps): TCreateGroup => {
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

// create matches in group:
// can be with rematches

type TCreateGroupMatchesProps = {
  teams: TTeam[];
  rematch?: boolean;
};
export const createGroupMatches = ({ teams, rematch }: TCreateGroupMatchesProps): TMatch[] => {
  if (teams.length > 3) {
    const matches = bergerAlgorithm({ teams });
    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches })];
    }
    return matches;
  } else if (teams.length === 3) {
    const matches = [
      initGroupMatch({ home: teams[0], away: teams[1], round: 1 }),
      initGroupMatch({ home: teams[1], away: teams[2], round: 2 }),
      initGroupMatch({ home: teams[2], away: teams[0], round: 3 }),
    ];

    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches })];
    }
    return matches;
  } else if (teams.length === 2) {
    const matches = [initGroupMatch({ home: teams[0], away: teams[1], round: 1 })];
    if (rematch) {
      return [...matches, ...createGroupReMatches({ matches })];
    }
    return matches;
  } else {
    return [];
  }
};

type TInitMatchProps = {
  home: TTeam;
  away: TTeam;
  round: number;
};
export const initGroupMatch = ({ home, away, round }: TInitMatchProps): TGroup['matches'][number] => {
  return {
    homeTeam: home,
    awayTeam: away,
    roundNumber: round,
  };
};

type TCreateGroupReMatchesProps = {
  matches: TMatch[];
};
const createGroupReMatches = ({ matches }: TCreateGroupReMatchesProps): TMatch[] =>
  matches.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: matches.length + i + 1,
  }));
