import { TGame } from './game';
import { Id } from './global';
import { TMatch } from './match';
import { TTeam } from './team';

export type TGroup = {
  id: string;
  name: string;
  teams: TTeam[];
  matches: TMatch[];
  promotionGames?: TPromotionGame[];
  promotionGroups?: TPromotionGroup[];
};

export type TCreateGroup = Omit<TGroup, 'id'>;

export type TGroupFlat = {
  id: string;
  name: string;
  teamsId: Id[];
  matchesId: Id[];
  promotionGames?: TPromotionGame[];
  promotionGroups?: TPromotionGroup[];
};

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
