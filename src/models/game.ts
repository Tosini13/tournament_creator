import { TMatch } from './match';

export type TGame<T = {}> = {
  match: TMatch;
  rematch?: TMatch;
} & T;
