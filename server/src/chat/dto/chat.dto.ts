import { IsNotEmpty } from 'class-validator';

export class ChatDto {
  gameId: string;
  playerId: string;
  message: string;
}
