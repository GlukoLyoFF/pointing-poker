import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDto } from './dto/game.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

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
    return newGame.save();
  }

  async remove(id: string): Promise<Game> {
    const removedGame = this.gameModel.findByIdAndRemove(id);
    return removedGame;
  }

  async update(id: string, gameDto: GameDto): Promise<Game> {
    const updatedGame = this.gameModel.findByIdAndUpdate(id, gameDto, {
      new: true,
    });
    return updatedGame;
  }
}
