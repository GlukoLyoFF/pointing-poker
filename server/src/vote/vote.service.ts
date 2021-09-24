import { Get, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { VoteDto } from './dto/vote.dto';
import { Vote, VoteDocument } from './schemas/vote.schema';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    private gateway: AppGateway,
  ) {}

  async getOne(id: string): Promise<Vote> {
    return this.voteModel.findById(id);
  }
  async getAll(): Promise<Vote[]> {
    return this.voteModel.find().exec();
  }
  async getByGameId(gameId: string): Promise<Vote[]> {
    return this.voteModel.find({ gameId: gameId }).exec();
  }
  async delete(id: string): Promise<Vote> {
    const deletedVote = await this.voteModel.findByIdAndDelete(id);
    //this.gateway.handleDeleteUser(deletedUser);
    return deletedVote;
  }
  async update(id: string, userDto: VoteDto): Promise<Vote> {
    return this.voteModel.findByIdAndUpdate(id, userDto, { new: true });
  }
  async create(voteDto: VoteDto): Promise<Vote> {
    const newVote = new this.voteModel(voteDto);
    //this.gateway.handleCreateUser(newVote);
    return newVote.save();
  }
}
