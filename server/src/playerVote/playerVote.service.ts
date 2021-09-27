import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { PlayerVoteDto } from './dto/playerVote.dto';
import { PlayerVote, PlayerVoteDocument } from './schemas/playerVote.schema';

@Injectable()
export class PlayerVoteService {
  constructor(
    @InjectModel(PlayerVote.name) private voteModel: Model<PlayerVoteDocument>,
    private gateway: AppGateway,
  ) {}

  async getOne(id: string): Promise<PlayerVote> {
    return this.voteModel.findById(id);
  }
  async getAll(): Promise<PlayerVote[]> {
    return this.voteModel.find().exec();
  }
  async getByGameId(gameId: string): Promise<PlayerVote[]> {
    return this.voteModel.find({ gameId: gameId }).exec();
  }
  async getByGameIdAndPlayerId(gameId: string, targetId: string): Promise<PlayerVote[]> {
    try {
      return this.voteModel.find({ gameId: gameId, targetId: targetId }).exec();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async delete(id: string): Promise<PlayerVote> {
    const deletedVote = await this.voteModel.findByIdAndDelete(id);
    return deletedVote;
  }
  async update(id: string, userDto: PlayerVoteDto): Promise<PlayerVote> {
    return this.voteModel.findByIdAndUpdate(id, userDto, { new: true });
  }
  async create(voteDto: PlayerVoteDto): Promise<PlayerVote> {
    const newVote = new this.voteModel(voteDto);
    return newVote.save();
  }
}
