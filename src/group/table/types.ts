import { TMatch, TScore, TTableRow, TTeam } from "../..";

export type TMapArg = Omit<TTableRow, 'team' | 'place' | 'promotedToGame' | 'promotedToGroup'>;
export type TMapGroup = Map<TTeam, TMapArg>;

export type TMatchWithScoreAndTeams = Omit<TMatch, 'score' | 'homeTeam' | 'awayTeam'> & {
    score: TScore;
    homeTeam: TTeam;
    awayTeam: TTeam;
}

export enum ERowProp {
    wonMatches = "wonMatches",
    lostMatches = "lostMatches",
    drawnMatches = "drawnMatches",
    goalsScored = "goalsScored",
    goalsLost = "goalsLost",
}

export type TCountProp = (match: TMatchWithScoreAndTeams) => (map: TMapGroup) => TMapGroup