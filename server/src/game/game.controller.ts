import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
import { GameDto } from './dto/game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGameDto: GameDto): Promise<Game> {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Game[]> {
    return this.gameService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Game> {
    const checkedGame = this.gameService.getOne(id);
    if (!checkedGame) throw new NotFoundException("Game doesn't exist!");
    return checkedGame;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<Game> {
    const deletedGame = this.gameService.remove(id);
    if (!deletedGame) throw new NotFoundException("Game doesn't exist!");
    return deletedGame;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateGameDto: GameDto,
  ): Promise<Game> {
    const editedPost = this.gameService.update(id, updateGameDto);
    if (!editedPost) throw new NotFoundException("Game doesn't exist!");
    return editedPost;
  }

  @Put('title/:id')
  @HttpCode(HttpStatus.OK)
  async updateTitle(
    @Param('id') id: string,
    @Body() updateGameDto: GameDto,
  ): Promise<Game> {
    const editedPost = this.gameService.updateTitle(id, updateGameDto);
    if (!editedPost) throw new NotFoundException("Game doesn't exist!");
    return editedPost;
  }

  @Put('settings/:id')
  @HttpCode(HttpStatus.OK)
  async updateSettings(
    @Param('id') id: string,
    @Body() updateGameDto: GameDto,
  ): Promise<Game> {
    const editedPost = this.gameService.updateGameSettings(id, updateGameDto);
    if (!editedPost) throw new NotFoundException("Game doesn't exist!");
    return editedPost;
  }
}
