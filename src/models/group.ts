import { Id } from './db';
import { TMatch } from './match';

export type TGroup<T = {}> = {
  id: Id;
  name: string;
  teams: Id[];
  matches: TMatch[];
  promotionGames?: TPromotionGame[];
  promotionGroups?: TPromotionGroup[];
} & T;

export type TCreateGroup = Omit<TGroup, 'id'>;

export type TPromotionGame = {
  gameId: string;
  site: ESite;
};

export type TPromotionGroup = {
  groupId: string;
  place: number;
};

export enum ESite {
  'HOME',
  'AWAY',
}

export type TGroupTable = TTableRow[];

export type TTableRow = {
  team: Id;
  points: number;
  playedMatches: number;
  wonMatches: number;
  lostMatches: number;
  drawnMatches: number;
  goalsScored: number;
  goalsLost: number;
  promotedToGame?: TPromotionGame;
  promotedToGroup?: TPromotionGroup;
};
