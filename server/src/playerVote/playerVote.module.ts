import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/gateway/app.gateway';
import { PlayerVote, PlayerVoteSchema } from './schemas/playerVote.schema';
import { PlayerVoteController } from './playerVote.controller';
import { PlayerVoteService } from './playerVote.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerVote.name, schema: PlayerVoteSchema },
    ]),
  ],
  controllers: [PlayerVoteController],
  providers: [PlayerVoteService, AppGateway],
})
export class PlayerVoteModule {}
