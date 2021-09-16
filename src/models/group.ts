import { TGame } from './game';
import { TMatch } from './match';
import { TTeam } from './team';

export type TGroup = {
  id: string;
  name: string;
  teams: Map<number, TTeam>;
  matches: TMatch[];
  promotionGames?: Map<number, TPromotionGame>;
  promotionGroups?: Map<number, TPromotionGroup>;
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
