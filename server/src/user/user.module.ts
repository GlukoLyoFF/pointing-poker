import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/file/file.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
