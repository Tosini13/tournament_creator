import { Id } from './db';
import { TScore } from './score';

export type TMatch<T = {}> = { // ID;
  roundNumber?: number;
  roundName?: string;
  homeTeam?: Id;
  awayTeam?: Id;
  score?: TScore;
  dateTime?: Date;
} & T;
