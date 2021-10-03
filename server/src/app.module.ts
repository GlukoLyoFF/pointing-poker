import { AppGatewayModule } from './gateway/app.gateway.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { PlayerVoteModule } from './playerVote/playerVote.module';
import { IssueVoteModule } from './issueVote/issueVote.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.mpoqa.mongodb.net/Games?retryWrites=true&w=majority`,
    ),
    AppGatewayModule,
    GameModule,
    UserModule,
    IssueModule,
    PlayerVoteModule,
    IssueVoteModule,
    ChatModule,
  ],
})
export class AppModule {}
