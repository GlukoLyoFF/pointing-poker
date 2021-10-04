import { GameService } from './../game/game.service';
import { GameDocument } from './../game/schemas/game.schema';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { IssueDocument } from 'src/issue/schemas/issue.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { PlayerVoteDocument } from 'src/playerVote/schemas/playerVote.schema';
import { IssueVoteDocument } from 'src/issueVote/schemas/issueVote.schema';
import { UserService } from 'src/user/user.service';
import { IssueService } from 'src/issue/issue.service';
import { PlayerVoteService } from 'src/playerVote/playerVote.service';
import { IssueVoteService } from 'src/issueVote/issueVote.service';
import { ChatService } from 'src/chat/chat.service';

interface IPayload<T> {
  event: string;
  payload: T;
}

interface IFinishGame {
  role: string;
  gameId: string;
  userId: string;
}

type StartVotingByPlayer = {
  gameId: string;
  playerId: string;
  targetId: string;
};

type ChatMessageType = {
  userId: string;
  message: string;
};

type ChatAnswerType = {
  user: User;
  message: string;
};

type FinishVotingByPlayer = {
  gameId: string;
  targetId: string;
};

export enum Events {
  Connection = 'connection',
  Disconnection = 'disconnection',

  CreateUser = 'createUser',
  CreateUserMsg = 'createUserMsg',
  ChooseUser = 'chooseUser',
  ChooseUserMsg = 'chooseUserMsg',
  DeleteUser = 'deleteUser',
  DeleteUserMsg = 'deleteUserMsg',

  StartGame = 'startGame',
  StartGameMsg = 'startGameMsg',
  ChangeGameSettings = 'changeGameSettings',
  ChangeGameSettingsMsg = 'changeGameSettingsMsg',
  ChangeTitle = 'changeTitle',
  ChangeTitleMsg = 'changeTitleMsg',
  EndGame = 'endGame',
  EndGameMsg = 'endGameMsg',

  CreateIssue = 'createIssue',
  CreateIssueMsg = 'createIssueMsg',
  ChooseIssue = 'chooseIssue',
  ChooseIssueMsg = 'chooseIssueMsg',
  UpdateIssue = 'updateIssue',
  UpdateIssueMsg = 'updateIssueMsg',
  DeleteIssue = 'deleteIssue',
  DeleteIssueMsg = 'deleteIssueMsg',

  StartRound = 'startRound',
  StartRoundMsg = 'startRoundMsg',
  ReStartRound = 'reStartRound',
  ReStartRoundMsg = 'reStartRoundMsg',
  EndRound = 'endRound',
  EndRoundMsg = 'endRoundMsg',

  StartVotingByPlayer = 'startVotingByPlayer',
  StartVotingByPlayerMsg = 'startVotingByPlayerMsg',
  VotingCannotStart = 'VotingCannotStart',

  FinishVotingByPlayer = 'finishVotingByPlayer',
  FinishVotingByPlayerMsg = 'finishVotingByPlayerMsg',

  AddVoteByPlayer = 'addVoteByPlayer',
  AddVoteByPlayerMsg = 'addVoteByPlayerMsg',
  DeleteVoteByPlayer = 'deleteVoteByPlayer',
  DeleteVoteByPlayerMsg = 'deleteVoteByPlayerMsg',
  ChangeVoteByPlayer = 'changeVoteByPlayer',
  ChangeVoteByPlayerMsg = 'changeVoteByPlayerMsg',

  AddVoteByIssue = 'addVoteByIssue',
  AddVoteByIssueMsg = 'addVoteByIssueMsg',
  DeleteVoteByIssue = 'deleteVoteByIssue',
  DeleteVoteByIssueMsg = 'deleteVoteByIssueMsg',
  ChangeVoteByIssue = 'changeVoteByIssue',
  ChangeVoteByIssueMsg = 'changeVoteByIssueMsg',
  DeleteIssueVotesByIssueId = 'deleteIssueVotesByIssueId',
  DeleteIssueVotesByIssueIdMsg = 'deleteIssueVotesByIssueIdMsg',

  FinishGame = 'finishGame',
  FinishGameMsg = 'finishGameMsg',

  MsgToServer = 'msgToServer',
  MsgToClient = 'msgToClient',
}
const WSPORT = 5005;
@Injectable()
@WebSocketGateway(WSPORT, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    @Inject(forwardRef(() => GameService))
    private gameService: GameService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => IssueService))
    private issueService: IssueService,
    @Inject(forwardRef(() => PlayerVoteService))
    private playerVoteService: PlayerVoteService,
    @Inject(forwardRef(() => IssueVoteService))
    private issueVoteService: IssueVoteService,
    @Inject(forwardRef(() => ChatService))
    private chatService: ChatService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconected: ${client.id}`);
    client.emit(Events.Disconnection, `Disconect: ${client.id}`);
  }
  handleConnection(client: Socket) {
    this.logger.log(`new client connected: ${client.id}`);
    client.emit(Events.Connection, `Success connection: ${client.id}`);
  }
  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage(Events.DeleteIssueVotesByIssueId)
  async handleDeleteIssueVotesByIssueId(
    client: Socket,
    message: string,
  ): Promise<void> {
    await this.issueVoteService.deleteIssueVotesByIssueId(message);
    const answer: IPayload<string> = {
      event: Events.DeleteIssueVotesByIssueId,
      payload: message,
    };
    this.wss.emit(Events.DeleteIssueVotesByIssueIdMsg, answer);
  }

  @SubscribeMessage(Events.StartVotingByPlayer)
  async handleStartVotingByPlayer(
    client: Socket,
    message: StartVotingByPlayer,
  ): Promise<void> {
    const player = await this.userService.getOne(message.playerId);
    const target = await this.userService.getOne(message.targetId);
    const answer: IPayload<{ player: User; target: User }> = {
      event: Events.StartVotingByPlayer,
      payload: {
        player: player,
        target: target,
      },
    };
    const start = await this.userService.getByGameId(message.gameId);
    const users = start.filter(it => it.role === 'user').length;
    if (users > 2) {
      console.log('Voiting started' + users);
      this.wss.emit(Events.StartVotingByPlayerMsg, answer);
    } else {
      console.log('Voiting failed' + users);
      this.wss.emit(Events.VotingCannotStart, 'Voting cannot start');
    }
  }

  @SubscribeMessage(Events.FinishVotingByPlayer)
  async handleFinishVotingByPlayer(
    client: Socket,
    message: FinishVotingByPlayer,
  ): Promise<void> {

    const votings = (await this.userService.getByGameId(message.gameId)).filter(it => it.role !== 'observer');
    const votes = await this.playerVoteService.getByTargetId(message.targetId);

    const answer: IPayload<string> = {
      event: Events.FinishVotingByPlayer,
      payload: 'Voting was finished',
    };

    let isDelete = false;

    votings.forEach(voting => {
      votes.forEach(vote => {
        if ((voting.role === 'creator') && (vote.vote === true) && (voting._id == vote.playerId)) {
          isDelete = true;
        }
      });
    });

    if (isDelete) {
      await this.userService.delete(message.targetId);
      await this.playerVoteService.deletePlayerVotesByUserId(message.targetId);
      await this.issueVoteService.deleteIssueVotesByUserId(message.targetId);
      await this.playerVoteService.deletePlayerVotesByTargetId(
        message.targetId,
      );
    } else {

      const decisionRight = votes.reduce((acc, { vote }) => {
        return vote === true ? ++acc : acc;
      }, 0);

      const decisionWrong = votes.reduce((acc, { vote }) => {
        return vote === false ? ++acc : acc;
      }, 0);

      if ( decisionRight > Math.floor(votings.length / 2)) {
        await this.userService.delete(message.targetId);
        await this.playerVoteService.deletePlayerVotesByUserId(message.targetId);
        await this.issueVoteService.deleteIssueVotesByUserId(message.targetId);
        await this.playerVoteService.deletePlayerVotesByTargetId(
          message.targetId,
        );
        this.wss.emit(Events.FinishVotingByPlayerMsg, answer);
      }
      if ( decisionWrong >= Math.floor(votings.length / 2)) {
        await this.playerVoteService.deletePlayerVotesByUserId(message.targetId);
        await this.playerVoteService.deletePlayerVotesByTargetId(
          message.targetId,
        );
        this.wss.emit(Events.FinishVotingByPlayerMsg, answer);
      }
    }
  }

  @SubscribeMessage(Events.MsgToServer)
  async handleSendMsg(client: Socket, message: ChatMessageType): Promise<void> {
    const user = await this.userService.getOne(message.userId);
    const answer: IPayload<ChatAnswerType> = {
      event: Events.MsgToClient,
      payload: {
        user: user,
        message: message.message,
      },
    };
    this.wss.emit(Events.MsgToClient, answer);
  }

  @SubscribeMessage(Events.FinishGame)
  async handleFinishGame(client: Socket, message: IFinishGame): Promise<void> {
    if (message.role === 'creator') {
      await this.gameService.remove(message.gameId);
      await this.userService.deleteByGameId(message.gameId);
      await this.issueService.deleteByGameId(message.gameId);
      await this.playerVoteService.deletePlayerVotesByGameId(message.gameId);
      await this.issueVoteService.deleteIssueVotesByGameId(message.gameId);
    } else {
      await this.userService.delete(message.userId);
      await this.playerVoteService.deletePlayerVotesByUserId(message.userId);
      await this.issueVoteService.deleteIssueVotesByUserId(message.userId);
    }
    const answer: IPayload<string> = {
      event: Events.FinishGame,
      payload:
        message.role === 'creator'
          ? 'Game was deleted successfully'
          : 'User was deleted successfully',
    };
    this.wss.emit(Events.FinishGameMsg, answer);
  }

  @SubscribeMessage(Events.CreateUser)
  handleCreateUser(message: UserDocument): void {
    const answer: IPayload<UserDocument> = {
      event: Events.CreateUser,
      payload: message,
    };
    this.wss.emit(Events.CreateUserMsg, answer);
  }

  @SubscribeMessage(Events.ChooseUser)
  handleChooseUser(message: UserDocument): void {
    const answer: IPayload<UserDocument> = {
      event: Events.ChooseUser,
      payload: message,
    };
    this.wss.emit(Events.ChooseUserMsg, answer);
  }

  @SubscribeMessage(Events.DeleteUser)
  handleDeleteUser(message: UserDocument): void {
    const answer: IPayload<UserDocument> = {
      event: Events.DeleteUser,
      payload: message,
    };
    this.wss.emit(Events.DeleteUserMsg, answer);
  }

  @SubscribeMessage(Events.CreateIssue)
  handleCreateIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: Events.CreateIssue,
      payload: message,
    };
    this.wss.emit(Events.CreateIssueMsg, answer);
  }

  @SubscribeMessage(Events.ChooseIssue)
  handleChooseIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: Events.ChooseIssue,
      payload: message,
    };
    this.wss.emit(Events.ChooseIssueMsg, answer);
  }

  @SubscribeMessage(Events.UpdateIssue)
  handleUpdateIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: Events.UpdateIssue,
      payload: message,
    };
    this.wss.emit(Events.UpdateIssueMsg, answer);
  }

  @SubscribeMessage(Events.DeleteIssue)
  handleDeleteIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: Events.DeleteIssue,
      payload: message,
    };
    this.wss.emit(Events.DeleteIssueMsg, answer);
  }

  @SubscribeMessage(Events.StartGame)
  handleStartGame(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: Events.StartGame,
      payload: message,
    };
    this.wss.emit(Events.StartGameMsg, answer);
  }

  @SubscribeMessage(Events.ChangeGameSettings)
  handleChangeGameSettings(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: Events.ChangeGameSettings,
      payload: message,
    };
    this.wss.emit(Events.ChangeGameSettingsMsg, answer);
  }

  @SubscribeMessage(Events.ChangeTitle)
  handleChangeTitle(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: Events.ChangeTitle,
      payload: message,
    };
    this.wss.emit(Events.ChangeTitleMsg, answer);
  }

  @SubscribeMessage(Events.EndGame)
  handleEndGame(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: Events.EndGame,
      payload: message,
    };
    this.wss.emit(Events.EndGameMsg, answer);
  }

  @SubscribeMessage(Events.AddVoteByPlayer)
  handleAddVoteByPlayer(message: PlayerVoteDocument): void {
    const answer: IPayload<PlayerVoteDocument> = {
      event: Events.AddVoteByPlayer,
      payload: message,
    };
    this.wss.emit(Events.AddVoteByPlayerMsg, answer);
  }

  @SubscribeMessage(Events.DeleteVoteByPlayer)
  handleDeleteVoteByPlayer(message: PlayerVoteDocument): void {
    const answer: IPayload<PlayerVoteDocument> = {
      event: Events.DeleteVoteByPlayer,
      payload: message,
    };
    this.wss.emit(Events.DeleteVoteByPlayerMsg, answer);
  }

  @SubscribeMessage(Events.ChangeVoteByPlayer)
  handleChangeVoteByPlayer(message: PlayerVoteDocument): void {
    const answer: IPayload<PlayerVoteDocument> = {
      event: Events.ChangeVoteByPlayer,
      payload: message,
    };
    this.wss.emit(Events.ChangeVoteByPlayerMsg, answer);
  }

  @SubscribeMessage(Events.AddVoteByIssue)
  handleAddVoteByIssue(message: IssueVoteDocument): void {
    const answer: IPayload<IssueVoteDocument> = {
      event: Events.AddVoteByIssue,
      payload: message,
    };
    this.wss.emit(Events.AddVoteByIssueMsg, answer);
  }

  @SubscribeMessage(Events.DeleteVoteByIssue)
  handleDeleteVoteByIssue(message: IssueVoteDocument): void {
    const answer: IPayload<IssueVoteDocument> = {
      event: Events.DeleteVoteByIssue,
      payload: message,
    };
    this.wss.emit(Events.DeleteVoteByIssueMsg, answer);
  }

  @SubscribeMessage(Events.ChangeVoteByIssue)
  handleChangeVoteByIssue(message: IssueVoteDocument): void {
    const answer: IPayload<IssueVoteDocument> = {
      event: Events.ChangeVoteByIssue,
      payload: message,
    };
    this.wss.emit(Events.ChangeVoteByIssueMsg, answer);
  }

  @SubscribeMessage(Events.StartRound)
  handleStartRound(client: Socket, message: string): void {
    const answer: IPayload<string> = {
      event: Events.StartRound,
      payload: message,
    };
    this.wss.emit(Events.StartRoundMsg, answer);
  }

  @SubscribeMessage(Events.ReStartRound)
  handleReStartRound(client: Socket, message: string): void {
    const answer: IPayload<string> = {
      event: Events.ReStartRound,
      payload: message,
    };
    this.wss.emit(Events.ReStartRoundMsg, answer);
  }

  @SubscribeMessage(Events.EndRound)
  handleEndRound(client: Socket, message: string): void {
    const answer: IPayload<string> = {
      event: Events.EndRound,
      payload: message,
    };
    this.wss.emit(Events.EndRoundMsg, answer);
  }
}
