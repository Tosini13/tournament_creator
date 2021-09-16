import { initGroupMatch } from '../group/createGroup';
import { TMatch } from '../models/match';
import { TTeam } from '../models/team';

type TBergerAlgorithmProps = {
  teams: TTeam[];
};

export const bergerAlgorithm = ({ teams }: TBergerAlgorithmProps): TMatch[] => {
  if (!(teams.length % 2)) {
    return bergerAlgorithmEven({ teams });
  } else {
    return bergerAlgorithmOdd({ teams });
  }
};

const bergerAlgorithmEven = ({ teams }: TBergerAlgorithmProps): TMatch[] => {
  const teamsQtt = teams.length;
  const fixedTeam = teams[0];
  const roundsQty = teams.length - 1;

  let iRound = 1;
  const matches: TMatch[] = [];
  const homeTeams: TTeam[] = teams.slice(1, teamsQtt / 2);
  const awayTeams: TTeam[] = teams.slice(teamsQtt / 2, teamsQtt).reverse();
  while (iRound <= roundsQty) {
    const roundMatches = awayTeams.map((away, i) => {
      if (i === 0 && !(iRound % 2)) {
        return initGroupMatch({ home: away, away: fixedTeam, round: iRound });
      } else if (i === 0) {
        return initGroupMatch({ home: fixedTeam, away, round: iRound });
      }
      return initGroupMatch({ home: homeTeams[i - 1], away, round: iRound });
    });

    matches.push(...roundMatches);
    const newAway = homeTeams.pop();
    const newHome = awayTeams.shift();
    if (newHome) homeTeams.unshift(newHome);
    if (newAway) awayTeams.push(newAway);
    iRound++;
  }
  return matches;
};

const bergerAlgorithmOdd = ({ teams }: TBergerAlgorithmProps): TMatch[] => {
  const teamsQtt = teams.length;
  const fixedTeam = teams[0];
  const roundsQty = teams.length;

  let iRound = 1;
  const matches: TMatch[] = [];
  const homeTeams: (TTeam | null)[] = teams.slice(1, (teamsQtt + 1) / 2);
  const awayTeams: (TTeam | null)[] = [...teams.slice((teamsQtt + 1) / 2, teamsQtt), null].reverse();
  while (iRound <= roundsQty) {
    const roundMatches = awayTeams
      .map((away, i) => {
        const home = homeTeams[i - 1];
        if (away === null || home === null) {
          return null;
        }
        if (i === 0 && !(iRound % 2)) {
          return initGroupMatch({ home: away, away: fixedTeam, round: iRound });
        } else if (i === 0) {
          return initGroupMatch({ home: fixedTeam, away, round: iRound });
        }
        return initGroupMatch({ home, away, round: iRound });
      })
      .filter((match) => match !== null) as TMatch[];

    matches.push(...roundMatches);
    const newAway = homeTeams.pop();
    const newHome = awayTeams.shift();
    if (newHome !== undefined) homeTeams.unshift(newHome);
    if (newAway !== undefined) awayTeams.push(newAway);
    iRound++;
  }
  return matches;
};
