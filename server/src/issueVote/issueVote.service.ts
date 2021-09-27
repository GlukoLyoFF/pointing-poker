import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueVoteDto } from './dto/issueVote.dto';
import { IssueVote, IssueVoteDocument } from './schemas/issueVote.schema';

@Injectable()
export class IssueVoteService {
  constructor(
    @InjectModel(IssueVote.name) private voteModel: Model<IssueVoteDocument>,
    private gateway: AppGateway,
  ) {}

  async getOne(id: string): Promise<IssueVote> {
    return this.voteModel.findById(id);
  }
  async getAll(): Promise<IssueVote[]> {
    return this.voteModel.find().exec();
  }
  async getByGameId(gameId: string): Promise<IssueVote[]> {
    return this.voteModel.find({ gameId: gameId }).exec();
  }
  async getByGameIdAndPlayerId(gameId: string, issueId: string): Promise<IssueVote[]> {
    try {
      return this.voteModel.find({ gameId: gameId, issueId: issueId }).exec();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async delete(id: string): Promise<IssueVote> {
    const deletedVote = await this.voteModel.findByIdAndDelete(id);
    return deletedVote;
  }
  async update(id: string, userDto: IssueVoteDto): Promise<IssueVote> {
    return this.voteModel.findByIdAndUpdate(id, userDto, { new: true });
  }
  async create(voteDto: IssueVoteDto): Promise<IssueVote> {
    const newVote = new this.voteModel(voteDto);
    return newVote.save();
  }
}
