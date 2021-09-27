import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { GameDto } from './dto/game.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private gateway: AppGateway,
  ) {}

  async getAll(): Promise<Game[]> {
    const AllGames = this.gameModel.find().exec();
    return AllGames;
  }

  async getOne(id: string): Promise<Game> {
    try {
      const oneGame = await this.gameModel.findById(id);
      return oneGame;
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }

  async create(gameDto: GameDto): Promise<Game> {
    try {
      const newGame = new this.gameModel(gameDto);
      newGame.url = newGame.url + newGame._id;
      this.gateway.handleStartGame(newGame);
      return await newGame.save();
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }

  async remove(id: string): Promise<Game> {
    try {
      const removedGame = await this.gameModel.findByIdAndRemove(id);
      this.gateway.handleEndGame(removedGame);
      return removedGame;
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }

  async update(id: string, gameDto: GameDto): Promise<Game> {
    try {
      const updatedGame = await this.gameModel.findByIdAndUpdate(id, gameDto, {
        new: true,
      });
      return updatedGame;
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }

  async updateGameSettings(id: string, gameDto: GameDto): Promise<Game> {
    try {
      const updatedGameSettings = await this.gameModel.findByIdAndUpdate(
        id,
        gameDto,
        {
          new: true,
        },
      );
      this.gateway.handleChangeGameSettings(updatedGameSettings);
      return updatedGameSettings;
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }

  async updateTitle(id: string, gameDto: GameDto): Promise<Game> {
    try {
      const updatedTitle = await this.gameModel.findByIdAndUpdate(id, gameDto, {
        new: true,
      });
      this.gateway.handleChangeTitle(updatedTitle);
      return updatedTitle;
    } catch {
      throw new NotFoundException("Game doesn't exist!");
    }
  }
}
