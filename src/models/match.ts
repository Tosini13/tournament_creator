import { TScore } from './score';
import { TTeam } from './team';

export type TMatch<T = {}> = {
  roundNumber?: number;
  roundName?: string;
  homeTeam?: TTeam;
  awayTeam?: TTeam;
  score?: TScore;
  dateTime?: Date;
} & T;
