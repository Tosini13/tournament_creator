import { TGame } from './game';
import { TMatch } from './match';
import { TTeam } from './team';

export type TGroup<T = {}> = {
  id: string;
  name: string;
  teams: TTeam[];
  matches: TMatch[];
  promotionGames?: TPromotionGame[];
  promotionGroups?: TPromotionGroup[];
} & T;


export type TCreateGroup = Omit<TGroup, 'id'>;

type TPromotionGame = {
  gameId: string;
  site: ESite;
};

type TPromotionGroup = {
  groupId: string;
  place: number;
};

enum ESite {
  'HOME',
  'AWAY',
}

export type TGroupTable = TTableRow[];

export type TTableRow = {
  team: TTeam;
  wonMatches: number;
  lostMatches: number;
  drawnMatches: number;
  goalsScored: number;
  goalsLost: number;
  promotedToGame?: TPromotionGame;
  promotedToGroup?: TPromotionGroup;
}