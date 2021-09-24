import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, set } from 'mongoose';
import { GameSettings } from '../dto/game.dto';

set('useFindAndModify', false);

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    default: {
      isAsPlayer: true,
      isChangeCard: false,
      isTimer: true,
      scoreType: 'string',
      shortScoreType: 'str',
      roundTime: 888,
      cardValues: [{ key: 'unknown', value: 'cup' }],
    },
  })
  gameSettings: GameSettings;
}

export const GameSchema = SchemaFactory.createForClass(Game);
