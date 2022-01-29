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
        (match.homeTeam.name === rowA.team.name || match.homeTeam.name === rowB.team.name) &&
        (match.awayTeam.name === rowA.team.name || match.awayTeam.name === rowB.team.name)); // TODO: check ID

    const goals = teamsMatches.reduce((acc, match) => ({
        [match.homeTeam.name]: {
            homeGoals: acc[match.homeTeam.name].homeGoals + match.score.home,
            awayGoals: acc[match.homeTeam.name].awayGoals
        },
        [match.awayTeam.name]: {
            homeGoals: acc[match.awayTeam.name].homeGoals,
            awayGoals: acc[match.awayTeam.name].awayGoals + match.score.away
        }
    }), {
        [rowA.team.name]: {
            homeGoals: 0,
            awayGoals: 0
        }, //TODO: should be ID
        [rowB.team.name]: {
            homeGoals: 0,
            awayGoals: 0
        }
    });

    const rowAGoals = goals[rowA.team.name].homeGoals + goals[rowA.team.name].awayGoals;
    const rowBGoals = goals[rowB.team.name].homeGoals + goals[rowB.team.name].awayGoals;

    if (rowAGoals > rowBGoals) {
        return -1;
    } else if (rowAGoals < rowBGoals) {
        return 1;
    } else {
        if (!options?.countGoalsAway) return 0;
        if (goals[rowA.team.name].awayGoals > goals[rowB.team.name].awayGoals) {
            return -1;
        }
        else if (goals[rowA.team.name].awayGoals < goals[rowB.team.name].awayGoals) {
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