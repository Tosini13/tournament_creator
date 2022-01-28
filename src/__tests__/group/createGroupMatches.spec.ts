import { initGroupMatch, createGroupMatches } from '../../group/createGroup';
import { TMatch } from '../../models/match';
import { teams } from '../mockData/teams';

test('Init Match', () => {
  const expected: TMatch = {
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

      homeTeam: sixTeams[0],
      awayTeam: sixTeams[5],
      roundNumber: 1,
    },
    {
      homeTeam: sixTeams[1],
      awayTeam: sixTeams[4],
      roundNumber: 1,
    },
    {
      homeTeam: sixTeams[2],
      awayTeam: sixTeams[3],
      roundNumber: 1,
    },

    {
      // 2 ROUND

      homeTeam: sixTeams[4],
      awayTeam: sixTeams[0],
      roundNumber: 2,
    },
    {
      homeTeam: sixTeams[5],
      awayTeam: sixTeams[3],
      roundNumber: 2,
    },
    {
      homeTeam: sixTeams[1],
      awayTeam: sixTeams[2],
      roundNumber: 2,
    },

    {
      // 3 ROUND

      homeTeam: sixTeams[0],
      awayTeam: sixTeams[3],
      roundNumber: 3,
    },
    {
      homeTeam: sixTeams[4],
      awayTeam: sixTeams[2],
      roundNumber: 3,
    },
    {
      homeTeam: sixTeams[5],
      awayTeam: sixTeams[1],
      roundNumber: 3,
    },

    {
      // 4 ROUND

      homeTeam: sixTeams[2],
      awayTeam: sixTeams[0],
      roundNumber: 4,
    },
    {
      homeTeam: sixTeams[3],
      awayTeam: sixTeams[1],
      roundNumber: 4,
    },
    {
      homeTeam: sixTeams[4],
      awayTeam: sixTeams[5],
      roundNumber: 4,
    },

    {
      // 5 ROUND

      homeTeam: sixTeams[0],
      awayTeam: sixTeams[1],
      roundNumber: 5,
    },
    {
      homeTeam: sixTeams[2],
      awayTeam: sixTeams[5],
      roundNumber: 5,
    },
    {
      homeTeam: sixTeams[3],
      awayTeam: sixTeams[4],
      roundNumber: 5,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: match.roundNumber && match.roundNumber + 5,
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
      homeTeam: fiveTeams[1],
      awayTeam: fiveTeams[4],
      roundNumber: 1,
    },
    {
      homeTeam: fiveTeams[2],
      awayTeam: fiveTeams[3],
      roundNumber: 1,
    },

    {
      // 2 ROUND

      homeTeam: fiveTeams[4],
      awayTeam: fiveTeams[0],
      roundNumber: 2,
    },
    {
      homeTeam: fiveTeams[1],
      awayTeam: fiveTeams[2],
      roundNumber: 2,
    },

    {
      // 3 ROUND

      homeTeam: fiveTeams[0],
      awayTeam: fiveTeams[3],
      roundNumber: 3,
    },
    {
      homeTeam: fiveTeams[4],
      awayTeam: fiveTeams[2],
      roundNumber: 3,
    },

    {
      // 4 ROUND

      homeTeam: fiveTeams[2],
      awayTeam: fiveTeams[0],
      roundNumber: 4,
    },
    {
      homeTeam: fiveTeams[3],
      awayTeam: fiveTeams[1],
      roundNumber: 4,
    },

    {
      // 5 ROUND

      homeTeam: fiveTeams[0],
      awayTeam: fiveTeams[1],
      roundNumber: 5,
    },
    {
      homeTeam: fiveTeams[3],
      awayTeam: fiveTeams[4],
      roundNumber: 5,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: match.roundNumber && match.roundNumber + 5,
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
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
      homeTeam: teams[1],
      awayTeam: teams[2],
      roundNumber: 2,
    },
    {
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
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
      homeTeam: teams[1],
      awayTeam: teams[2],
      roundNumber: 2,
    },
    {
      homeTeam: teams[2],
      awayTeam: teams[0],
      roundNumber: 3,
    },
    {
      homeTeam: teams[1],
      awayTeam: teams[0],
      roundNumber: 4,
    },
    {
      homeTeam: teams[2],
      awayTeam: teams[1],
      roundNumber: 5,
    },
    {
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
      homeTeam: teams[0],
      awayTeam: teams[1],
      roundNumber: 1,
    },
    {
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
