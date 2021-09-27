import { Document, set } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IIssueVote } from '../dto/issueVote.dto';

export type IssueVoteDocument = IssueVote & Document;

set('useFindAndModify', false);

@Schema()
export class IssueVote {
  @Prop({ required: true })
  gameId: string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  issueId: string;

  @Prop({ default: {key: '', value: ''}})
  vote: IIssueVote;
}

export const IssueVoteSchema = SchemaFactory.createForClass(IssueVote);
