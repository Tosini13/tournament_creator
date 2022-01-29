import { TTableRow } from "../..";
import { TMatchWithScoreAndTeams } from "./types";

type TSortTable = (rowA: TTableRow, rowB: TTableRow) => number;

const sortByScoredGoals = (next?: TSortTable): TSortTable => (rowA, rowB) => {
    if (rowA.goalsScored > rowB.goalsScored) {
        return -1;
    } else if (rowA.goalsScored < rowB.goalsScored) {
        return 1;
    } else {
        return next ? next(rowA, rowB) : 0;
    }
}

const sortByGoalsDiffrence = (next?: TSortTable): TSortTable => (rowA, rowB) => {
    const rowADif = rowA.goalsScored - rowA.goalsLost;
    const rowBDif = rowB.goalsScored - rowB.goalsLost;
    if (rowADif > rowBDif) {
        return -1;
    } else if (rowADif < rowBDif) {
        return 1;
    } else {
        return next ? next(rowA, rowB) : 0;
    }
}

const sortByWonMatches = (next?: TSortTable): TSortTable => (rowA, rowB) => {
    if (rowA.wonMatches > rowB.wonMatches) {
        return -1;
    } else if (rowA.wonMatches < rowB.wonMatches) {
        return 1;
    } else {
        return next ? next(rowA, rowB) : 0;
    }
}

const sortByPoints = (next?: TSortTable): TSortTable => (rowA, rowB) => {
    if (rowA.points > rowB.points) {
        return -1;
    } else if (rowA.points < rowB.points) {
        return 1;
    } else {
        return next ? next(rowA, rowB) : 0;
    }
}

const sortByDirectScore = (matches: TMatchWithScoreAndTeams[]) => (options?: TSortOptions): TSortTable => (rowA, rowB) => {
    const teamsMatches = matches.filter(match =>
        (match.homeTeam === rowA.team || match.homeTeam === rowB.team) &&
        (match.awayTeam === rowA.team || match.awayTeam === rowB.team)); // TODO: check ID

    const goals = teamsMatches.reduce((acc, match) => ({
        [match.homeTeam]: {
            homeGoals: acc[match.homeTeam].homeGoals + match.score.home,
            awayGoals: acc[match.homeTeam].awayGoals
        },
        [match.awayTeam]: {
            homeGoals: acc[match.awayTeam].homeGoals,
            awayGoals: acc[match.awayTeam].awayGoals + match.score.away
        }
    }), {
        [rowA.team]: {
            homeGoals: 0,
            awayGoals: 0
        }, //TODO: should be ID
        [rowB.team]: {
            homeGoals: 0,
            awayGoals: 0
        }
    });

    const rowAGoals = goals[rowA.team].homeGoals + goals[rowA.team].awayGoals;
    const rowBGoals = goals[rowB.team].homeGoals + goals[rowB.team].awayGoals;

    if (rowAGoals > rowBGoals) {
        return -1;
    } else if (rowAGoals < rowBGoals) {
        return 1;
    } else {
        if (!options?.countGoalsAway) return 0;
        if (goals[rowA.team].awayGoals > goals[rowB.team].awayGoals) {
            return -1;
        }
        else if (goals[rowA.team].awayGoals < goals[rowB.team].awayGoals) {
            return 1;
        }
        return 0;
    }
}

export type TSortOptions = {
    countGoalsAway?: boolean;
}

export const sortTable = (matches: TMatchWithScoreAndTeams[]) => (options?: TSortOptions): TSortTable => (rowA, rowB) =>
    sortByPoints(
        sortByWonMatches(
            sortByGoalsDiffrence(
                sortByScoredGoals(
                    sortByDirectScore(matches)(options)
                )
            )
        )
    )(rowA, rowB);