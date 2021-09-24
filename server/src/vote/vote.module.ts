import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
  controllers: [VoteController],
  providers: [VoteService, AppGateway]
})
export class VoteModule {}
