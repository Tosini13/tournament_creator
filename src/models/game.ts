import { TMatch } from './match';

export type TGame = {
  id: string;
  match: TMatch;
  rematch?: TMatch;
};
