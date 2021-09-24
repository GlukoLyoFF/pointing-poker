import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { Issue, IssueSchema } from './schemas/issue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]),
  ],
  controllers: [IssueController],
  providers: [IssueService, AppGateway],
})
export class IssueModule {}
