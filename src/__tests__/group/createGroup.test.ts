import { initGroupMatch, createGroupMatches } from '../../group/createGroup';
import { TMatch } from '../../models/match';
import { TTeam } from '../../models/team';

const teams: TTeam[] = [
  { id: 'fcb', name: 'F.C. Barcelona' }, //1
  { id: 'rmcf', name: 'Real Madrid C.F.' }, //2
  { id: 'at', name: 'Atletico de Madrid' }, //3
  { id: 'sfc', name: 'Sevilla F.C.' }, //4
  { id: 'vfc', name: 'Valencia F.C.' }, //5
  { id: 'ab', name: 'Athletic Bilbao' }, //6

  { id: 'cv', name: 'Celta Vigo' }, //7
  { id: 'rb', name: 'real Betis' }, //8
];

test('Init Match', () => {
  const expected: TMatch = {
    id: 'MATCH1',
    homeTeam: teams[0],
    awayTeam: teams[1],
    roundNumber: 1,
  };
  expect(
    initGroupMatch({
      home: teams[0],
      away: teams[1],
      round: 1,
    }),
  ).toEqual(expected);
});

// MORE THAN 3 TEAMS

test('Create Group Matches for more than 6 teams with rematches', () => {
  const sixTeams = teams.slice(0, 6);
  const expected: TMatch[] = [
    {
      // 1 ROUND
      id: 'MATCH1',
      homeTeam: sixTeams[0],
      awayTeam: sixTeams[5],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[1],
      awayTeam: sixTeams[4],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[2],
      awayTeam: sixTeams[3],
      roundNumber: 1,
    },

    {
      // 2 ROUND
      id: 'MATCH1',
      homeTeam: sixTeams[4],
      awayTeam: sixTeams[0],
      roundNumber: 2,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[5],
      awayTeam: sixTeams[3],
      roundNumber: 2,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[1],
      awayTeam: sixTeams[2],
      roundNumber: 2,
    },

    {
      // 3 ROUND
      id: 'MATCH1',
      homeTeam: sixTeams[0],
      awayTeam: sixTeams[3],
      roundNumber: 3,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[4],
      awayTeam: sixTeams[2],
      roundNumber: 3,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[5],
      awayTeam: sixTeams[1],
      roundNumber: 3,
    },

    {
      // 4 ROUND
      id: 'MATCH1',
      homeTeam: sixTeams[2],
      awayTeam: sixTeams[0],
      roundNumber: 4,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[3],
      awayTeam: sixTeams[1],
      roundNumber: 4,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[4],
      awayTeam: sixTeams[5],
      roundNumber: 4,
    },

    {
      // 5 ROUND
      id: 'MATCH1',
      homeTeam: sixTeams[0],
      awayTeam: sixTeams[1],
      roundNumber: 5,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[2],
      awayTeam: sixTeams[5],
      roundNumber: 5,
    },
    {
      id: 'MATCH1',
      homeTeam: sixTeams[3],
      awayTeam: sixTeams[4],
      roundNumber: 5,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: expected.length + i + 1,
  }));
  expect(
    createGroupMatches({
      teams: sixTeams,
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

test('Create Group Matches for more than 5 teams', () => {
  const fiveTeams = teams.slice(0, 5);
  const expected: TMatch[] = [
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[1],
      awayTeam: fiveTeams[4],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[2],
      awayTeam: fiveTeams[3],
      roundNumber: 1,
    },

    {
      // 2 ROUND
      id: 'MATCH1',
      homeTeam: fiveTeams[4],
      awayTeam: fiveTeams[0],
      roundNumber: 2,
    },
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[1],
      awayTeam: fiveTeams[2],
      roundNumber: 2,
    },

    {
      // 3 ROUND
      id: 'MATCH1',
      homeTeam: fiveTeams[0],
      awayTeam: fiveTeams[3],
      roundNumber: 3,
    },
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[4],
      awayTeam: fiveTeams[2],
      roundNumber: 3,
    },

    {
      // 4 ROUND
      id: 'MATCH1',
      homeTeam: fiveTeams[2],
      awayTeam: fiveTeams[0],
      roundNumber: 4,
    },
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[3],
      awayTeam: fiveTeams[1],
      roundNumber: 4,
    },

    {
      // 5 ROUND
      id: 'MATCH1',
      homeTeam: fiveTeams[0],
      awayTeam: fiveTeams[1],
      roundNumber: 5,
    },
    {
      id: 'MATCH1',
      homeTeam: fiveTeams[3],
      awayTeam: fiveTeams[4],
      roundNumber: 5,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: expected.length + i + 1,
  }));
  expect(
    createGroupMatches({
      teams: fiveTeams,
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

// 3 TEAMS

test('Create Group Matches for 3 teams', () => {
  const expected: TMatch[] = [
    {
      id: 'MATCH1',
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[1],
      awayTeam: teams[2],
      roundNumber: 2,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[2],
      awayTeam: teams[0],
      roundNumber: 3,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3),
      rematch: false,
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 3 teams with rematches', () => {
  const expected: TMatch[] = [
    {
      id: 'MATCH1',
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[1],
      awayTeam: teams[2],
      roundNumber: 2,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[2],
      awayTeam: teams[0],
      roundNumber: 3,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[1],
      awayTeam: teams[0],
      roundNumber: 4,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[2],
      awayTeam: teams[1],
      roundNumber: 5,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[0],
      awayTeam: teams[2],
      roundNumber: 6,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3),
      rematch: true,
    }),
  ).toEqual(expected);
});

// 2 TEAMS

test('Create Group Matches for 2 teams', () => {
  const expected: TMatch[] = [
    {
      id: 'MATCH1',
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2),
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 2 teams with rematch', () => {
  const expected: TMatch[] = [
    {
      id: 'MATCH1',
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
      id: 'MATCH1',
      homeTeam: teams[1],
      awayTeam: teams[0],
      roundNumber: 2,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2),
      rematch: true,
    }),
  ).toEqual(expected);
});

// LESS THAN 2 TEAMS

test('Create Group Matches for less than 2 teams', () => {
  expect(
    createGroupMatches({
      teams: [teams[0]],
      rematch: false,
    }),
  ).toEqual([]);
});
