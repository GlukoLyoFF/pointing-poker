import { io } from 'socket.io-client';
import { Message } from 'core/types/socketMessageType';
import { CurrentUser } from 'core/types/currentUserType';
import { IPlayerVote } from 'core/types/postToServerTypes';

const SERVER_URL = 'https://carabaz.herokuapp.com/';
export const socket = io(SERVER_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnectionDelayMax: 10000,
});

export const sendStartGame = (): void => {
  socket.emit('startRound', Message.startGame);
};

export const finishGame = (user: CurrentUser): void => {
  socket.emit(Message.finishGame, user);
};

export const startPlayerVoting = (vote: IPlayerVote): void => {
  socket.emit(Message.StartVotingByPlayer, vote);
};

export const sendUserMessage = (data: { userId: string; message: string }): void => {
  socket.emit('msgToServer', { userId: data.userId, message: data.message });
};
