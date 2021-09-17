import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserRole } from './dto/user.dto';
import { FileService } from 'src/file/file.service';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
  ) {}

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async update(id: string, userDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }
  async create(userDto: UserDto): Promise<User> {
    const { image } = userDto;
    const fileName = await this.fileService.createFile(image);
    const newUser = new this.userModel({ ...userDto, image: fileName });
    return newUser.save();
  }
  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getByGameIdAndByRole(gameId: string, role: UserRole): Promise<User[]> {
    console.log(gameId, role);
    return this.userModel.find({ gameId: gameId, role: role }).exec();
  }
  async getByGameId(gameId: string): Promise<User[]> {
    console.log(gameId);
    return this.userModel.find({ gameId: gameId }).exec();
  }
}
