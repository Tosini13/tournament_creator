import { TRoundName } from '../playOffs/types';
import { TMatch } from './match';

export type TGame<T = {}> = {
  gameNumber: number;
  round: TRoundName;
  branch?: string;
  match: TMatch;
  rematch?: TMatch;
} & T;
