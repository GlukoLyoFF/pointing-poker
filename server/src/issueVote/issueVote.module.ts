import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueVote, IssueVoteSchema } from './schemas/issueVote.schema';
import { IssueVoteController } from './issueVote.controller';
import { IssueVoteService } from './issueVote.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IssueVote.name, schema: IssueVoteSchema },
    ]),
  ],
  controllers: [IssueVoteController],
  providers: [IssueVoteService, AppGateway],
})
export class IssueVoteModule {}
