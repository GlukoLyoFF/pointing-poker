import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserRole } from './dto/user.dto';
import { FileService } from 'src/file/file.service';
import { User, UserDocument } from './schemas/user.schema';
import { AppGateway } from 'src/gateway/app.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
    private gateway: AppGateway,
  ) {}

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    this.gateway.handleDeleteUser(deletedUser);
    return deletedUser;
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async create(userDto: UserDto): Promise<User> {
    const { image } = userDto;
    const fileName = await this.fileService.createFile(image);
    const newUser = new this.userModel({ ...userDto, image: fileName });
    this.gateway.handleCreateUser(newUser);
    return newUser.save();
  }

  async getOne(id: string): Promise<User> {
    const findOne = await this.userModel.findById(id);
    this.gateway.handleChooseUser(findOne);
    return this.userModel.findById(id);
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getByGameIdAndByRole(gameId: string, role: UserRole): Promise<User[]> {
    return this.userModel.find({ gameId: gameId, role: role }).exec();
  }

  async getByGameId(gameId: string): Promise<User[]> {
    return this.userModel.find({ gameId: gameId }).exec();
  }
}
