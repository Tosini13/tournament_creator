export enum E_PLAY_OFFS_ROUND {
  'FINAL' = 'FINAL',
  'SEMI_FINAL' = 'SEMI_FINAL',
  'QUARTER_FINAL' = 'QUARTER_FINAL',
}

export type TRoundName = E_PLAY_OFFS_ROUND | `1/${number}`;

export type TPromotionType = 'winner' | 'looser';
