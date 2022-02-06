import { TGroup, TGroupTable, TMatch, TTeam } from "../..";
import { TMapGroup, TMapArg, TMatchWithScoreAndTeams } from "./types";
import { countTable, initRow } from "./countTable";
import { sortTable, TSortOptions } from "./sortTable";
import { Id } from "../../models/db";

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


export const getGroupTable = (group: TGroup, options?: TSortOptions): TGroupTable => {

    // TODO: Functional programming - remove proxy variabless
    const matchesWithScoreAndTeams = group.matches.filter(withScoreAndTeams);

    const countedTable: TMapGroup = matchesWithScoreAndTeams
        .reduce<TMapGroup>((map, match) => countTable(match)(map), new Map<Id, TMapArg>(
            group.teams.map(team => [team, initRow])
        ));


    return convertMapToArray(countedTable).sort(sortTable(matchesWithScoreAndTeams)(options));
};