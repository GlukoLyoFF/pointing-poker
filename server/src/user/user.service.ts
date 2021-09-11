import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async update(id: string, userDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }
  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel({ ...userDto });
    return newUser.save();
  }
  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
