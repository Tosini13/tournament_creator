import { TGroup, TGroupTable, TMatch, TTeam } from "../..";
import * as R from 'ramda';
import { TMapGroup, TMapArg, TMatchWithScoreAndTeams } from "./types";
import { countTable, initRow } from "./utils";



// TODO: Remove, because it's temp
const trace = R.tap(console.log.bind(console));

export function withScoreAndTeams(value: TMatch): value is TMatchWithScoreAndTeams {
    return (
        value.score !== null && value.score !== undefined &&
        value.homeTeam !== null && value.homeTeam !== undefined &&
        value.awayTeam !== null && value.awayTeam !== undefined);
}

const convertMapToArray = (map: TMapGroup): TGroupTable => Array.from(map, ([key, value]) => ({
    team: key,
    ...value
}));


export const getGroupTable = (group: TGroup): TGroupTable => {

    const countedTable: TMapGroup = group.matches
        .filter(withScoreAndTeams)
        .reduce<Map<TTeam, TMapArg>>((map, match) => countTable(match)(map), new Map<TTeam, TMapArg>(
            group.teams.map(team => [team, initRow])
        ));

    const table: TGroupTable = convertMapToArray(countedTable); //TODO: sort it!

    console.log('table', table);

    return table;
};