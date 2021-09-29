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
import { UserDocument } from 'src/user/schemas/user.schema';
import { PlayerVoteDocument } from 'src/playerVote/schemas/playerVote.schema';
import { IssueVoteDocument } from 'src/issueVote/schemas/issueVote.schema';
import { UserService } from 'src/user/user.service';
import { IssueService } from 'src/issue/issue.service';
import { PlayerVoteService } from 'src/playerVote/playerVote.service';
import { IssueVoteService } from 'src/issueVote/issueVote.service';

interface IPayload<T> {
  event: string;
  payload: T;
}

interface IFinishGame {
  role: string;
  gameId: string;
  userId: string;
}

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

  FinishGame = 'finishGame',
  FinishGameMsg = 'finishGameMsg',
}

const WSPORT = 5000;
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
