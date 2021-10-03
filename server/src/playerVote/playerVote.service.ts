import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { PlayerVoteDto } from './dto/playerVote.dto';
import { PlayerVote, PlayerVoteDocument } from './schemas/playerVote.schema';

@Injectable()
export class PlayerVoteService {
  constructor(
    @InjectModel(PlayerVote.name) private voteModel: Model<PlayerVoteDocument>,
    @Inject(forwardRef(() => AppGateway))
    private gateway: AppGateway,
  ) {}

  async getOne(id: string): Promise<PlayerVote> {
    try {
      return await this.voteModel.findById(id);
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
  async getAll(): Promise<PlayerVote[]> {
    return this.voteModel.find().exec();
  }
  async getByGameId(gameId: string): Promise<PlayerVote[]> {
    return this.voteModel.find({ gameId: gameId }).exec();
  }
  async getByTargetId(targetId: string): Promise<PlayerVote[]> {
    return this.voteModel.find({ targetId: targetId }).exec();
  }
  async getByGameIdAndPlayerId(
    gameId: string,
    targetId: string,
  ): Promise<PlayerVote[]> {
    try {
      return await this.voteModel
        .find({ gameId: gameId, targetId: targetId })
        .exec();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async delete(id: string): Promise<PlayerVote> {
    try {
      const deletedVote = await this.voteModel.findByIdAndDelete(id);
      this.gateway.handleDeleteVoteByPlayer(deletedVote);
      return deletedVote;
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
  async update(id: string, userDto: PlayerVoteDto): Promise<PlayerVote> {
    try {
      const updatedVote = await this.voteModel.findByIdAndUpdate(id, userDto, {
        new: true,
      });
      this.gateway.handleChangeVoteByPlayer(updatedVote);
      return updatedVote;
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }
  async create(voteDto: PlayerVoteDto): Promise<PlayerVote> {
    try {
      const newVote = new this.voteModel(voteDto);
      this.gateway.handleAddVoteByPlayer(newVote);
      return await newVote.save();
    } catch {
      throw new NotFoundException("Vote doesn't exist!");
    }
  }

  async deletePlayerVotesByTargetId(targetId: string): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  > {
    try {
      const deletedPlayersVotesByTargetId = await this.voteModel.deleteMany({
        targetId: targetId,
      });
      return deletedPlayersVotesByTargetId;
    } catch {
      throw new NotFoundException("Votes doesn't exist!");
    }
  }

  async deletePlayerVotesByUserId(userId: string): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  > {
    try {
      const deletedPlayersVotesByUserId = await this.voteModel.deleteMany({
        playerId: userId,
      });
      return deletedPlayersVotesByUserId;
    } catch {
      throw new NotFoundException("Votes doesn't exist!");
    }
  }

  async deletePlayerVotesByGameId(gameId: string): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  > {
    try {
      const deletedPlayersVotesByGameId = await this.voteModel.deleteMany({
        gameId: gameId,
      });
      return deletedPlayersVotesByGameId;
    } catch {
      throw new NotFoundException("Votes doesn't exist!");
    }
  }
}
