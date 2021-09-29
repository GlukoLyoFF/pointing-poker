import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueVoteDto } from './dto/issueVote.dto';
import { IssueVote, IssueVoteDocument } from './schemas/issueVote.schema';

@Injectable()
export class IssueVoteService {
  constructor(
    @InjectModel(IssueVote.name) private voteModel: Model<IssueVoteDocument>,
    @Inject(forwardRef(() => AppGateway))
    private gateway: AppGateway,
  ) {}

  async getOne(id: string): Promise<IssueVote> {
    try {
      return await this.voteModel.findById(id);
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async getAll(): Promise<IssueVote[]> {
    return this.voteModel.find().exec();
  }

  async getByGameId(gameId: string): Promise<IssueVote[]> {
    return this.voteModel.find({ gameId: gameId }).exec();
  }

  async getByGameIdAndPlayerId(
    gameId: string,
    issueId: string,
  ): Promise<IssueVote[]> {
    try {
      return await this.voteModel
        .find({ gameId: gameId, issueId: issueId })
        .exec();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async delete(id: string): Promise<IssueVote> {
    try {
      const deletedVote = await this.voteModel.findByIdAndDelete(id);
      this.gateway.handleDeleteVoteByIssue(deletedVote);
      return deletedVote;
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
  async update(id: string, issueVoteDto: IssueVoteDto): Promise<IssueVote> {
    try {
      const updatedVote = await this.voteModel.findByIdAndUpdate(
        id,
        issueVoteDto,
        { new: true },
      );
      this.gateway.handleChangeVoteByIssue(updatedVote);
      return updatedVote;
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
  async create(voteDto: IssueVoteDto): Promise<IssueVote> {
    try {
      const newVote = new this.voteModel(voteDto);
      this.gateway.handleAddVoteByIssue(newVote);
      return await newVote.save();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
}
