import { IsNotEmpty } from "class-validator";

export class ChatDto {
  @IsNotEmpty()
  gameId: string;
  @IsNotEmpty()
  playerId: string;
  @IsNotEmpty()
  message: string;
}