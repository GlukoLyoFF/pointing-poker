import { Document, set } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../dto/user.dto';

export type UserDocument = User & Document;

set('useFindAndModify', false);

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  jobPosition: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  role: UserRole;

  @Prop({ required: true })
  gameId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
