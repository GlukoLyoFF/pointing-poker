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
import { UserService } from './user.service';
import { UserDto, UserRole } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<User[]> {
    const allUsers = this.userService.getAll();
    return allUsers;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const oneUser = await this.userService.getOne(id);
    return oneUser;
  }

  @Get('gameid/:gameId&:role')
  @HttpCode(HttpStatus.OK)
  async getByGameIdAndRole(
    @Param('gameId') gameId: string,
    @Param('role') role: UserRole,
  ): Promise<User[]> {
    const userList = this.userService.getByGameIdAndByRole(gameId, role);
    return userList;
  }

  @Get('gameid/:gameId')
  @HttpCode(HttpStatus.OK)
  async getByGameId(@Param('gameId') gameId: string): Promise<User[]> {
    const userList = this.userService.getByGameId(gameId);
    return userList;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: UserDto) {
    const createdUser = this.userService.create(userDto);
    return createdUser;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    const updatedUser = this.userService.update(id, userDto);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const deletedUser = this.userService.delete(id);
    return deletedUser;
  }
}
