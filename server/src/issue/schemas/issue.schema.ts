import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, set } from 'mongoose';
import { IssuePriority } from '../dto/issue.dto';

set('useFindAndModify', false);

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  link: string;

  @Prop({ required: true })
  priority: IssuePriority;

  @Prop({ required: true })
  gameId: string;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
