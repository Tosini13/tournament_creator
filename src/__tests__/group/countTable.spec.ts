import { TGroupTable } from '../..';
import createGroup from '../../group/createGroup';
import { getGroupTable } from '../../group/table/getGroupTable';
import { teams } from '../../utils/mockData/teams';

const BARCA = teams[0].id;
const REAL = teams[1].id;
const ATLETICO = teams[2].id;
const SEVILLA = teams[3].id;
const VALENCIA = teams[4].id;

describe('group creation', () => {
  it('Get Table - Points', () => {
    const groupA = createGroup({
      name: 'Group A',
      teams: teams.slice(0, 3).map((team) => team.id),
    });

    groupA.matches[0].score = {
      home: 1, // barca
      away: 0, // real
    };
    groupA.matches[1].score = {
      home: 2, // real
      away: 1, // atleti
    };
    groupA.matches[2].score = {
      home: 1, // atleti
      away: 2, // barca
    };

    const table = getGroupTable({ ...groupA, id: 'groupA' }, { countGoalsAway: true });

    const expectedTable: TGroupTable = [
      {
        team: BARCA,
        playedMatches: 2,
        points: 6,
        wonMatches: 2,
        lostMatches: 0,
        drawnMatches: 0,
        goalsScored: 3,
        goalsLost: 1,
      },
      {
        team: REAL,
        playedMatches: 2,
        points: 3,
        wonMatches: 1,
        lostMatches: 1,
        drawnMatches: 0,
        goalsScored: 2,
        goalsLost: 2,
      },
      {
        team: ATLETICO,
        playedMatches: 2,
        points: 0,
        wonMatches: 0,
        lostMatches: 2,
        drawnMatches: 0,
        goalsScored: 2,
        goalsLost: 4,
      },
    ];
    expect(table).toEqual(expectedTable);
  });

  it('Get Table - sortByWonMatches', () => {
    const groupA = createGroup({
      name: 'Group A',
      teams: teams.slice(0, 5).map((team) => team.id),
    });

    groupA.matches[0].score = {
      home: 1, // real
      away: 1, // valencia
    };
    groupA.matches[3].score = {
      home: 2, // real
      away: 2, // atleti
    };
    groupA.matches[7].score = {
      home: 0, // sevilla
      away: 0, // real
    };
    groupA.matches[2].score = {
      home: 1, // valencia
      away: 2, // barca
    };

    const table = getGroupTable({ ...groupA, id: 'groupA' }, { countGoalsAway: true });

    const expectedTable: TGroupTable = [
      {
        team: BARCA,
        playedMatches: 1,
        points: 3,
        wonMatches: 1,
        lostMatches: 0,
        drawnMatches: 0,
        goalsScored: 2,
        goalsLost: 1,
      },
      {
        team: REAL,
        playedMatches: 3,
        points: 3,
        wonMatches: 0,
        lostMatches: 0,
        drawnMatches: 3,
        goalsScored: 3,
        goalsLost: 3,
      },
      {
        team: ATLETICO,
        playedMatches: 1,
        points: 1,
        wonMatches: 0,
        lostMatches: 0,
        drawnMatches: 1,
        goalsScored: 2,
        goalsLost: 2,
      },
      {
        team: SEVILLA,
        playedMatches: 1,
        points: 1,
        wonMatches: 0,
        lostMatches: 0,
        drawnMatches: 1,
        goalsScored: 0,
        goalsLost: 0,
      },
      {
        team: VALENCIA,
        playedMatches: 2,
        points: 1,
        wonMatches: 0,
        lostMatches: 1,
        drawnMatches: 1,
        goalsScored: 2,
        goalsLost: 3,
      },
    ];
    expect(table).toEqual(expectedTable);
  });
  it('Get Table - sortByGoalsDiffrence', () => {
    const groupA = createGroup({
      name: 'Group A',
      teams: teams.slice(0, 3).map((team) => team.id),
    });

    groupA.matches[0].score = {
      home: 1, // barca
      away: 1, // real
    };
    groupA.matches[1].score = {
      home: 2, // real
      away: 1, // atleti
    };
    groupA.matches[2].score = {
      home: 0, // atleti
      away: 3, // barca
    };

    const table = getGroupTable({ ...groupA, id: 'groupA' }, { countGoalsAway: true });
    const expectedTable: TGroupTable = [
      {
        team: BARCA,
        playedMatches: 2,
        points: 4,
        wonMatches: 1,
        lostMatches: 0,
        drawnMatches: 1,
        goalsScored: 4,
        goalsLost: 1,
      },
      {
        team: REAL,
        playedMatches: 2,
        points: 4,
        wonMatches: 1,
        lostMatches: 0,
        drawnMatches: 1,
        goalsScored: 3,
        goalsLost: 2,
      },
      {
        team: ATLETICO,
        playedMatches: 2,
        points: 0,
        wonMatches: 0,
        lostMatches: 2,
        drawnMatches: 0,
        goalsScored: 1,
        goalsLost: 5,
      },
    ];
    expect(table).toEqual(expectedTable);
  });
  it('Get Table - sortByScoredGoals', () => {
    const groupA = createGroup({
      name: 'Group A',
      teams: teams.slice(0, 3).map((team) => team.id),
    });

    groupA.matches[0].score = {
      home: 1, // barca
      away: 0, // real
    };
    groupA.matches[1].score = {
      home: 1, // real
      away: 1, // atleti
    };
    groupA.matches[2].score = {
      home: 1, // atleti
      away: 2, // barca
    };

    const table = getGroupTable({ ...groupA, id: 'groupA' }, { countGoalsAway: true });

    const expectedTable: TGroupTable = [
      {
        team: BARCA,
        playedMatches: 2,
        points: 6,
        wonMatches: 2,
        lostMatches: 0,
        drawnMatches: 0,
        goalsScored: 3,
        goalsLost: 1,
      },
      {
        team: ATLETICO,
        playedMatches: 2,
        points: 1,
        wonMatches: 0,
        lostMatches: 1,
        drawnMatches: 1,
        goalsScored: 2,
        goalsLost: 3,
      },
      {
        team: REAL,
        playedMatches: 2,
        points: 1,
        wonMatches: 0,
        lostMatches: 1,
        drawnMatches: 1,
        goalsScored: 1,
        goalsLost: 2,
      },
    ];
    expect(table).toEqual(expectedTable);
  });
  it('Get Table - sortByDirectScore', () => {
    const groupA = createGroup({
      name: 'Group A',
      teams: teams.slice(0, 3).map((team) => team.id),
    });

    groupA.matches[0].score = {
      home: 0, // barca
      away: 1, // real
    };
    groupA.matches[1].score = {
      home: 0, // real
      away: 1, // atleti
    };
    groupA.matches[2].score = {
      home: 1, // atleti
      away: 2, // barca
    };

    const table = getGroupTable({ ...groupA, id: 'groupA' }, { countGoalsAway: true });

    const expectedTable: TGroupTable = [
      {
        team: BARCA,
        playedMatches: 2,
        points: 3,
        wonMatches: 1,
        lostMatches: 1,
        drawnMatches: 0,
        goalsScored: 2,
        goalsLost: 2,
      },
      {
        team: ATLETICO,
        playedMatches: 2,
        points: 3,
        wonMatches: 1,
        lostMatches: 1,
        drawnMatches: 0,
        goalsScored: 2,
        goalsLost: 2,
      },
      {
        team: REAL,
        playedMatches: 2,
        points: 3,
        wonMatches: 1,
        lostMatches: 1,
        drawnMatches: 0,
        goalsScored: 1,
        goalsLost: 1,
      },
    ];
    expect(table).toEqual(expectedTable);
  });
});
