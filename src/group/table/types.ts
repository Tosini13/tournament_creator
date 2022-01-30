import { TMatch, TScore, TTableRow } from "../..";
import { Id } from "../../models/db";

export type TMapArg = Omit<TTableRow, 'team' | 'place' | 'promotedToGame' | 'promotedToGroup'>;
export type TMapGroup = Map<Id, TMapArg>;

export type TMatchWithScoreAndTeams = Omit<TMatch, 'score' | 'homeTeam' | 'awayTeam'> & {
    score: TScore;
    homeTeam: Id;
    awayTeam: Id;
}

export enum ERowProp {  // TODO: typeof Object.keys
    points = "points",
    playedMatches = "playedMatches",
    wonMatches = "wonMatches",
    lostMatches = "lostMatches",
    drawnMatches = "drawnMatches",
    goalsScored = "goalsScored",
    goalsLost = "goalsLost",
}

export type TCountProp = (match: TMatchWithScoreAndTeams) => (map: TMapGroup) => TMapGroup