import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { VoteDto } from './dto/vote.dto';
import { Vote } from './schemas/vote.schema';
import { VoteService } from './vote.service';

@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Vote[]> {
    const allVotes = this.voteService.getAll();
    return allVotes;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const oneVote= this.voteService.getOne(id);
    return oneVote;
  }

  @Get('gameid/:gameId')
  @HttpCode(HttpStatus.OK)
  async getByGameId(@Param('gameId') gameId: string): Promise<Vote[]> {
    const voteList = this.voteService.getByGameId(gameId);
    return voteList;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() voteDto: VoteDto) {
    const createdVote = this.voteService.create(voteDto);
    if (!createdVote) throw new NotFoundException("Vote doesn't exist!");
    return createdVote;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() voteDto: VoteDto) {
    const updatedVote= this.voteService.update(id, voteDto);
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
