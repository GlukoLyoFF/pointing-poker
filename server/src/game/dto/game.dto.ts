import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  gameSettings: GameSettings;
}
