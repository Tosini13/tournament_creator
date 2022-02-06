import { Id } from "./db";

export type TTeam<T = {}> = {
  name: string;
  id: Id;
} & T;
