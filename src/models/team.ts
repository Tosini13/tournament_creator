import { Id } from "./db";

export type TTeam<T = {}> = {
  name: string;
} & T;

export type TTeamData = TTeam<{ id: Id }>;
