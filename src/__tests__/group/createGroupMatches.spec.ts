import { initGroupMatch, createGroupMatches } from '../../group/createGroup';
import { TMatch } from '../../models/match';
import { iterator } from '../../utils/generators';
import { teams } from '../../utils/mockData/teams';

test('Init Match', () => {
  const expected: TMatch = {
    homeTeam: teams[0].id,
    awayTeam: teams[1].id,
    roundNumber: 1,
    matchNumber: 1,
  };
  expect(
    initGroupMatch({
      home: teams[0].id,
      away: teams[1].id,
      round: 1,
      number: 1,
    }),
  ).toEqual(expected);
});

// MORE THAN 3 TEAMS

test('Create Group Matches for more than 6 teams with rematches', () => {
  const i = iterator(1);
  const sixTeams = teams.slice(0, 6);
  const expected: TMatch[] = [
    {
      // 1 ROUND

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[1].id,
      awayTeam: sixTeams[4].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },

    {
      // 2 ROUND

      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[0].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[5].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[1].id,
      awayTeam: sixTeams[2].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },

    {
      // 3 ROUND

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[3].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[2].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[5].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },

    {
      // 4 ROUND

      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[0].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[3].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[4].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },

    {
      // 5 ROUND

      homeTeam: sixTeams[0].id,
      awayTeam: sixTeams[1].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[2].id,
      awayTeam: sixTeams[5].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
    {
      homeTeam: sixTeams[3].id,
      awayTeam: sixTeams[4].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: match.roundNumber && match.roundNumber + 5,
    matchNumber: i + 1 + expected.length,
  }));

  expect(
    createGroupMatches({
      teams: sixTeams.map((team) => team.id),
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

test('Create Group Matches for more than 5 teams', () => {
  const i = iterator(1);
  const fiveTeams = teams.slice(0, 5);
  const expected: TMatch[] = [
    {
      homeTeam: fiveTeams[1].id,
      awayTeam: fiveTeams[4].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: fiveTeams[2].id,
      awayTeam: fiveTeams[3].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },

    {
      // 2 ROUND

      homeTeam: fiveTeams[4].id,
      awayTeam: fiveTeams[0].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
    {
      homeTeam: fiveTeams[1].id,
      awayTeam: fiveTeams[2].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },

    {
      // 3 ROUND

      homeTeam: fiveTeams[0].id,
      awayTeam: fiveTeams[3].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },
    {
      homeTeam: fiveTeams[4].id,
      awayTeam: fiveTeams[2].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },

    {
      // 4 ROUND

      homeTeam: fiveTeams[2].id,
      awayTeam: fiveTeams[0].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },
    {
      homeTeam: fiveTeams[3].id,
      awayTeam: fiveTeams[1].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },

    {
      // 5 ROUND

      homeTeam: fiveTeams[0].id,
      awayTeam: fiveTeams[1].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
    {
      homeTeam: fiveTeams[3].id,
      awayTeam: fiveTeams[4].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
  ];
  const expectedRematches = expected.map((match, i) => ({
    ...match,
    homeTeam: match.awayTeam,
    awayTeam: match.homeTeam,
    roundNumber: match.roundNumber && match.roundNumber + 5,
    matchNumber: match.matchNumber + expected.length,
  }));
  expect(
    createGroupMatches({
      teams: fiveTeams.map((team) => team.id),
      rematch: true,
    }),
  ).toEqual([...expected, ...expectedRematches]);
});

// 3 TEAMS

test('Create Group Matches for 3 teams', () => {
  const i = iterator(1);
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[2].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[0].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3).map((team) => team.id),
      rematch: false,
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 3 teams with rematches', () => {
  const i = iterator(1);
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[2].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[0].id,
      roundNumber: 3,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[0].id,
      roundNumber: 4,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[2].id,
      awayTeam: teams[1].id,
      roundNumber: 5,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[0].id,
      awayTeam: teams[2].id,
      roundNumber: 6,
      matchNumber: i.next().value,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 3).map((team) => team.id),
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
      matchNumber: 1,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2).map((team) => team.id),
    }),
  ).toEqual(expected);
});

test('Create Group Matches for 2 teams with rematch', () => {
  const i = iterator(1);
  const expected: TMatch[] = [
    {
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
      roundNumber: 1,
      matchNumber: i.next().value,
    },
    {
      homeTeam: teams[1].id,
      awayTeam: teams[0].id,
      roundNumber: 2,
      matchNumber: i.next().value,
    },
  ];
  expect(
    createGroupMatches({
      teams: teams.slice(0, 2).map((team) => team.id),
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
