import { createTournament } from '../index';

test('My Greeter', () => {
  expect(createTournament('Champions League')).toBe('Champions League is your first tournament');
});
