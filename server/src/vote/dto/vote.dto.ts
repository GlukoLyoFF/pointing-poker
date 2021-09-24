import { UserDto } from './../../user/dto/user.dto';

export class VoteDto {
  gameId: string;
  type: string;
  data: UserDto;
  vote: boolean;
}
