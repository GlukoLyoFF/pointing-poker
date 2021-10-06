import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IssueVoteDto } from './dto/issueVote.dto';
import { IssueVote } from './schemas/issueVote.schema';
import { IssueVoteService } from './issueVote.service';

@Controller('issuevotes')
export class IssueVoteController {
  constructor(private voteService: IssueVoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<IssueVote[]> {
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
  async getByGameId(@Param('gameId') gameId: string): Promise<IssueVote[]> {
    const voteList = this.voteService.getByGameId(gameId);
    return voteList;
  }

  @Get('gameid/:gameId/issueid/:issueId')
  @HttpCode(HttpStatus.OK)
  async getByGameIdAndRole(
    @Param('gameId') gameId: string,
    @Param('issueId') issueId: string,
  ): Promise<IssueVote[]> {
    const issueVoteList = this.voteService.getByGameIdAndIssueId(
      gameId,
      issueId,
    );
    return issueVoteList;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() voteDto: IssueVoteDto) {
    const createdVote = this.voteService.create(voteDto);
    return createdVote;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() voteDto: IssueVoteDto) {
    const updatedVote = await this.voteService.update(id, voteDto);
    return updatedVote;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const deletedVote = this.voteService.delete(id);
    return deletedVote;
  }
}
