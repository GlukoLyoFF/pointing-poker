export interface IGameSettings {
  isAsPlayer: boolean;
  isChangeCard: boolean;
  isTimer: boolean;
  scoreType: string;
  shortScoreType: string;
  roundTime?: number;
  cardValues: IGameCard[];
}

export interface IGameCard {
  key: string;
  value: string;
}
