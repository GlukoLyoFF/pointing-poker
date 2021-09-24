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
import { Injectable, Logger } from '@nestjs/common';
import { IssueDocument } from 'src/issue/schemas/issue.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

interface IPayload<T> {
  event: string;
  payload: T;
}

@WebSocketGateway(5000, { cors: true })
@Injectable()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconected: ${client.id}`);
    client.emit('disconnection', `Disconect: ${client.id}`);
  }
  handleConnection(client: Socket) {
    this.logger.log(`new client connected: ${client.id}`);
    client.emit('connection', `Success connection: ${client.id}`);
  }
  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('createUser')
  handleCreateUser(message: UserDocument): void {
    const answer: IPayload<UserDocument> = {
      event: 'createUser',
      payload: message,
    };
    this.wss.emit('createUserMsg', answer);
  }

  @SubscribeMessage('deleteUser')
  handleDeleteUser(message: UserDocument): void {
    const answer: IPayload<UserDocument> = {
      event: 'deleteIssue',
      payload: message,
    };
    this.wss.emit('deleteUserMsg', answer);
  }

  @SubscribeMessage('createIssue')
  handleCreateIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: 'createIssue',
      payload: message,
    };
    this.wss.emit('createIssueMsg', answer);
  }

  @SubscribeMessage('chooseIssue')
  handleChooseIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: 'chooseIssue',
      payload: message,
    };
    this.wss.emit('chooseIssueMsg', answer);
  }

  @SubscribeMessage('deleteIssue')
  handleDeleteIssue(message: IssueDocument): void {
    const answer: IPayload<IssueDocument> = {
      event: 'deleteIssue',
      payload: message,
    };
    this.wss.emit('deleteIssueMsg', answer);
  }

  @SubscribeMessage('startGame')
  handleStartGame(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: 'startGame',
      payload: message,
    };
    this.wss.emit('startGameMsg', answer);
  }

  @SubscribeMessage('endGame')
  handleEndGame(message: GameDocument): void {
    const answer: IPayload<GameDocument> = {
      event: 'endGame',
      payload: message,
    };
    this.wss.emit('endGameMsg', answer);
  }


}
