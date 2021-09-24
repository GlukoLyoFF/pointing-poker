import { UserDto } from './../../user/dto/user.dto';
import { Document, set } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VoteDocument = Vote & Document;

set('useFindAndModify', false);

@Schema()
export class Vote {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  data: UserDto;

  @Prop({ required: true })
  type: string;

  @Prop({ default: '' })
  vote: boolean;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
