import { Id } from './db';
import { TScore } from './score';

export type TMatch<T = {}> = {
  roundNumber?: number;
  roundName?: string;
  homeTeam?: Id;
  awayTeam?: Id;
  score?: TScore;
  dateTime?: Date;
} & T;
