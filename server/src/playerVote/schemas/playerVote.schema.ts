import { Document, set } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlayerVoteDocument = PlayerVote & Document;

set('useFindAndModify', false);

@Schema()
export class PlayerVote {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  targetId: string;

  @Prop({ default: false })
  vote: boolean;
}

export const PlayerVoteSchema = SchemaFactory.createForClass(PlayerVote);
