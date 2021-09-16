import { TScore } from './score';
import { TTeam } from './team';

export type TMatch = {
  id: string;
  roundNumber?: number;
  roundName?: string;
  homeTeam?: TTeam;
  awayTeam?: TTeam;
  score?: TScore;
  dateTime?: Date;
};
