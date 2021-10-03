import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { set } from 'mongoose';

set('useFindAndModify', false);

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
