export class PlayerVoteDto {
  gameId: string;
  playerId: string;
  targetId: string;
  vote?: boolean;
}
