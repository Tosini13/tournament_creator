import { TTableRow, TTeam } from "../..";
import { ERowProp, TCountProp, TMapGroup } from "./types";
import * as R from 'ramda';
import { Id } from "../../models/db";

export const initRow: Omit<TTableRow, 'place' | 'team'> = {
    playedMatches: 0,
    wonMatches: 0,
    lostMatches: 0,
    drawnMatches: 0,
    goalsScored: 0,
    goalsLost: 0,
    points: 0,
}

const addToProp = (map: TMapGroup) => (prop: ERowProp) => (qtt: number = 1) => (team: Id): TMapGroup => {
    const row = map.get(team);
    if (row) {
        map.set(team, { ...row, [prop]: row[prop] + qtt })
    } else {
        map.set(team, { ...initRow, [prop]: qtt })
    }
    return map;
}

const countPlayedMatches: TCountProp = (match) => (map) => {
    const playMatch = addToProp(map)(ERowProp.playedMatches)();
    playMatch(match.homeTeam);
    playMatch(match.awayTeam);
    return map;
}

const countWonMatches: TCountProp = (match) => (map) => {
    const win = addToProp(map)(ERowProp.wonMatches)();
    if (match.score.home > match.score.away) {
        win(match.homeTeam);
    } else if (match.score.home < match.score.away) {
        win(match.awayTeam);
    }
    return map;
}

const countLostMatches: TCountProp = (match) => (map) => {
    const lose = addToProp(map)(ERowProp.lostMatches)();
    if (match.score.home < match.score.away) {
        lose(match.homeTeam);
    } else if (match.score.home > match.score.away) {
        lose(match.awayTeam);
    }
    return map;
}

const countDrawnMatches: TCountProp = (match) => (map) => {
    const draw = addToProp(map)(ERowProp.drawnMatches)();
    if (match.score.home === match.score.away) {
        draw(match.homeTeam);
        draw(match.awayTeam);
    }
    return map;
}


const countGoalsScored: TCountProp = (match) => (map) => {
    const score = addToProp(map)(ERowProp.goalsScored);
    score(match.score.home)(match.homeTeam);
    score(match.score.away)(match.awayTeam);
    return map;
}

const countGoalsLost: TCountProp = (match) => (map) => {
    const lostGoals = addToProp(map)(ERowProp.goalsLost);
    lostGoals(match.score.away)(match.homeTeam);
    lostGoals(match.score.home)(match.awayTeam);
    return map;
}

const countPoints: TCountProp = (match) => (map) => {
    const addPoints = addToProp(map)(ERowProp.points);
    if (match.score.home > match.score.away) {
        addPoints(3)(match.homeTeam);
    } else if (match.score.home < match.score.away) {
        addPoints(3)(match.awayTeam);
    } else {
        addPoints(1)(match.homeTeam);
        addPoints(1)(match.awayTeam);

    }
    return map;
}


export const countTable: TCountProp = (match) => (map) => {
    return R.pipe(
        countPlayedMatches(match),
        countWonMatches(match),
        countLostMatches(match),
        countDrawnMatches(match),
        countGoalsScored(match),
        countGoalsLost(match),
        countPoints(match)
    )(map);
} 