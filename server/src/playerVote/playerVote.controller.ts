import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerVoteDto } from './dto/playerVote.dto';
import { PlayerVote } from './schemas/playerVote.schema';
import { PlayerVoteService } from './playerVote.service';

@Controller('playervotes')
export class PlayerVoteController {
  constructor(private voteService: PlayerVoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<PlayerVote[]> {
    const allVotes = this.voteService.getAll();
    return allVotes;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const oneVote = this.voteService.getOne(id);
    return oneVote;
  }

  @Get('gameid/:gameId')
  @HttpCode(HttpStatus.OK)
  async getByGameId(@Param('gameId') gameId: string): Promise<PlayerVote[]> {
    const voteList = this.voteService.getByGameId(gameId);
    return voteList;
  }

  @Get('gameidandtargetid/:gameId&:targetId')
  @HttpCode(HttpStatus.OK)
  async getByGameIdAndRole(
    @Param('gameId') gameId: string,
    @Param('targetId') targetId: string,
  ): Promise<PlayerVote[]> {
    const playerVoteList = this.voteService.getByGameIdAndPlayerId(gameId, targetId);
    return playerVoteList;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() voteDto: PlayerVoteDto) {
    const createdVote = this.voteService.create(voteDto);
    if (!createdVote) throw new NotFoundException("Vote doesn't exist!");
    return createdVote;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() voteDto: PlayerVoteDto) {
    const updatedVote = this.voteService.update(id, voteDto);
    if (!updatedVote) throw new NotFoundException("Vote doesn't exist!");
    return updatedVote;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const deletedVote = this.voteService.delete(id);
    if (!deletedVote) throw new NotFoundException("Vote doesn't exist!");
    return deletedVote;
  }
}
