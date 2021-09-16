import { TTeam } from './team';

export type TTournament<T = {}> = {
  name: string;
  teams: TTeam[];
} & T;
