import { TPromotionType, TRoundName } from '../playOffs/types';
import { Id } from './db';
import { TScore } from './score';

export type TMatch<T = {}> = {
  matchNumber: number;
  roundNumber?: number;
  roundName?: string;
  branch?: string;
  homeTeam?: Id | 'NO_TEAM';
  awayTeam?: Id | 'NO_TEAM';
  score?: TScore;
  dateTime?: Date;
  placeholderGame?: {
    home?: TPlaceholderGameTeam;
    away?: TPlaceholderGameTeam;
  };
  placeholderGroup?: {
    home: TPlaceholderGroupTeam;
    away: TPlaceholderGroupTeam;
  };
} & T;

export type TPlaceholderGameTeam = {
  game: {
    roundName: TRoundName;
    gameNumber: number;
    branch?: string;
  };
  promotionType: TPromotionType;
};

type TPlaceholderGroupTeam = {
  groupId: Id;
  promotionType: TPromotionType;
};
