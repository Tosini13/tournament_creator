import createGroup from "../../group/createGroup";
import { getGroupTable } from "../../group/table/getGroupTable";
import { teams } from "../mockData/teams";

describe('group creation', () => {

    it('Create Group', () => {
        const groupA = createGroup({
            name: 'Group A',
            teams: teams.slice(0, 3),
        })

        groupA.matches[0].score = {
            home: 2,
            away: 1
        };
        groupA.matches[1].score = {
            home: 1,
            away: 1
        };
        groupA.matches[2].score = {
            home: 0,
            away: 3
        };

        console.log('groupA', groupA.matches);
        getGroupTable({ ...groupA, id: 'groupA' });
    });

})