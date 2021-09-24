//import { AppGateway } from 'src/app.gateway';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
//import { appGateway } from 'src/app.module';
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
    const oneGame = this.gameModel.findById(id);
    return oneGame;
  }

  async create(gameDto: GameDto): Promise<Game> {
    const newGame = new this.gameModel(gameDto);
    newGame.url = newGame.url + newGame._id;
    this.gateway.handleStartGame(newGame);
    return newGame.save();
  }

  async remove(id: string): Promise<Game> {
    const removedGame = await this.gameModel.findByIdAndRemove(id);
    this.gateway.handleEndGame(removedGame);
    return removedGame;
  }

  async update(id: string, gameDto: GameDto): Promise<Game> {
    const updatedGame = this.gameModel.findByIdAndUpdate(id, gameDto, {
      new: true,
    });
    return updatedGame;
  }
}
