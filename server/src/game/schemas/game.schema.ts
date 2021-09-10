import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, set } from 'mongoose';

set('useFindAndModify', false);

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  url: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
