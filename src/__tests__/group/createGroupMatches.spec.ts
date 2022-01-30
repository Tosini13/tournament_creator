import { initGroupMatch, createGroupMatches } from '../../group/createGroup';
import { TMatch } from '../../models/match';
import { teams } from '../../utils/mockData/teams';

test('Init Match', () => {
  const expected: TMatch = {
    homeTeam: teams[0].id,
    awayTeam: teams[1].id,
    roundNumber: 1,
  };
  expect(
    initGroupMatch({
      home: teams[0].id,
      away: teams[1].id,
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

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 1,
    },
    {
      homeTeam: sixTeams[1].id,
      awayTeam: sixTeams[4].id,
      roundNumber: 1,
    },
    {
      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 1,
    },

    {
      // 2 ROUND

      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[0].id,
      roundNumber: 2,
    },
    {
      homeTeam: sixTeams[5].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 2,
    },
    {
      homeTeam: sixTeams[1].id,
      awayTeam: sixTeams[2].id,
      roundNumber: 2,
    },

    {
      // 3 ROUND

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 3,
    },
    {
      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[2].id,
      roundNumber: 3,
    },
    {
      homeTeam: sixTeams[5].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 3,
    },

    {
      // 4 ROUND

      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[0].id,
      roundNumber: 4,
    },
    {
      homeTeam: sixTeams[3].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 4,
    },
    {
      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 4,
    },

    {
      // 5 ROUND

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 5,
    },
    {
      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 5,
    },
    {
      homeTeam: sixTeams[3].id,
      awayTeam: sixTeams[4].id,
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
      teams: sixTeams.map(team => team.id),
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

test('Create Group Matches for more than 5 teams', () => {
  const fiveTeams = teams.slice(0, 5);
  const expected: TMatch[] = [
    {
      homeTeam: fiveTeams[1].id,
      awayTeam: fiveTeams[4].id,
      roundNumber: 1,
    },
    {
      homeTeam: fiveTeams[2].id,
      awayTeam: fiveTeams[3].id,
      roundNumber: 1,
    },

    {
      // 2 ROUND

      homeTeam: fiveTeams[4].id,
      awayTeam: fiveTeams[0].id,
      roundNumber: 2,
    },
    {
      homeTeam: fiveTeams[1].id,
      awayTeam: fiveTeams[2].id,
      roundNumber: 2,
    },

    {
      // 3 ROUND

      homeTeam: fiveTeams[0].id,
      awayTeam: fiveTeams[3].id,
      roundNumber: 3,
    },
    {
      homeTeam: fiveTeams[4].id,
      awayTeam: fiveTeams[2].id,
      roundNumber: 3,
    },

    {
      // 4 ROUND

      homeTeam: fiveTeams[2].id,
      awayTeam: fiveTeams[0].id,
      roundNumber: 4,
    },
    {
      homeTeam: fiveTeams[3].id,
      awayTeam: fiveTeams[1].id,
      roundNumber: 4,
    },

    {
      // 5 ROUND

      homeTeam: fiveTeams[0].id,
      awayTeam: fiveTeams[1].id,
      roundNumber: 5,
    },
    {
      homeTeam: fiveTeams[3].id,
      awayTeam: fiveTeams[4].id,
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
      teams: fiveTeams.map(team => team.id),
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

// 3 TEAMS

test('Create Group Matches for 3 teams', () => {
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[2].id,
      roundNumber: 2,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[0].id,
      roundNumber: 3,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3).map(team => team.id),
      rematch: false,
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 3 teams with rematches', () => {
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[2].id,
      roundNumber: 2,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[0].id,
      roundNumber: 3,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[0].id,
      roundNumber: 4,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[1].id,
      roundNumber: 5,
    },
    {
      homeTeam: teams[0].id,
      awayTeam: teams[2].id,
      roundNumber: 6,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3).map(team => team.id),
      rematch: true,
    }),
  ).toEqual(expected);
});

// 2 TEAMS

test('Create Group Matches for 2 teams', () => {
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2).map(team => team.id),
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 2 teams with rematch', () => {
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[0].id,
      roundNumber: 2,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2).map(team => team.id),
      rematch: true,
    }),
  ).toEqual(expected);
});

// LESS THAN 2 TEAMS

test('Create Group Matches for less than 2 teams', () => {
  expect(
    createGroupMatches({
      teams: [teams[0].id],
      rematch: false,
    }),
  ).toEqual([]);
});
