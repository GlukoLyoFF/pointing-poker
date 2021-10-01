import { io } from 'socket.io-client';
import { Message } from 'core/types/socketMessageType';
import { CurrentUser } from 'core/types/currentUserType';

const SERVER_URL = 'http://localhost:5000';
export const socket = io(SERVER_URL, {
  reconnectionDelayMax: 10000,
});

// socket.on(Message.startGame, msg => {
//   console.info(msg);
// });

// socket.on(Message.endGame, msg => {
//   console.info(msg);
// });

// socket.on(Message.chooseIssue, msg => {
//   console.info(msg);
// });

// socket.on(Message.createIssue, msg => {
//   console.info(msg);
// });

// socket.on(Message.deleteIssue, msg => {
//   console.info(msg);
// });

// socket.on(Message.createUser, msg => {
//   console.info(msg);
// });

// socket.on(Message.deleteUser, msg => {
//   console.info(msg);
// });

export const sendStartGame = () => {
  socket.emit('startRound', Message.startGame);
};

export const finishGame = (user: CurrentUser): void => {
  socket.emit(Message.finishGame, user);
};
