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
import { Injectable, Logger, Scope } from '@nestjs/common';
import { IssueDocument } from 'src/issue/schemas/issue.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

interface IPayload<T> {
  event: string;
  payload: T;
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
}

const WSPORT = 5000;
@WebSocketGateway(WSPORT, { cors: true })
@Injectable({ scope: Scope.DEFAULT })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

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
}
