import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { FileService } from 'src/file/file.service';
import { User, UserDocument } from './schemas/user.schema';
import { AppGateway } from 'src/gateway/app.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AppGateway))
    private gateway: AppGateway,
    private fileService: FileService,
  ) {}

  async delete(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      this.gateway.handleDeleteUser(deletedUser);
      return deletedUser;
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(id, userDto, { new: true });
    } catch {
      throw new NotFoundException(
        "User doesn't exist or check request's body!",
      );
    }
  }

  async create(userDto: UserDto): Promise<User> {
    try {
      const newUser = new this.userModel(userDto);
      this.gateway.handleCreateUser(newUser);
      return await newUser.save();
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async getOne(id: string): Promise<User> {
    try {
      const findOne = await this.userModel.findById(id);
      this.gateway.handleChooseUser(findOne);
      return this.userModel.findById(id);
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getByGameIdAndByRole(gameId: string, role: string): Promise<User[]> {
    try {
      return await this.userModel.find({ gameId: gameId, role: role }).exec();
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async getByGameId(gameId: string): Promise<UserDocument[]> {
    try {
      return await this.userModel.find({ gameId: gameId }).exec();
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }

  async deleteByGameId(gameId: string): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  > {
    try {
      const deletedUsersByGameId = await this.userModel.deleteMany({
        gameId: gameId,
      });
      return deletedUsersByGameId;
    } catch {
      throw new NotFoundException("User doesn't exist!");
    }
  }
}
