import { TScore } from './score';
import { TTeam } from './team';

export type TMatch = {
  id: string;
  homeTeam: TTeam;
  awayTeam: TTeam;
  score: TScore;
  dateTime?: Date;
};
