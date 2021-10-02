import { IsNotEmpty, IsString } from 'class-validator';

export class GameSettings {
  isAsPlayer: boolean;
  isChangeCard: boolean;
  isTimer: boolean;
  scoreType: string;
  shortScoreType: string;
  roundTime: number;
  cardValues: { key: string; value: string }[];
}

export class GameDto {
  url: string;
  title: string;
  gameSettings: GameSettings;
}
