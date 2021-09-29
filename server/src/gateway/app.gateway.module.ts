import { Global, Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { UserModule } from 'src/user/user.module';
import { PlayerVoteModule } from 'src/playerVote/playerVote.module';
import { IssueVoteModule } from 'src/issueVote/issueVote.module';
import { IssueModule } from './../issue/issue.module';
import { AppGateway } from 'src/gateway/app.gateway';

@Global()
@Module({
  imports: [
    IssueModule,
    GameModule,
    UserModule,
    PlayerVoteModule,
    IssueVoteModule,
  ],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppGatewayModule {}
