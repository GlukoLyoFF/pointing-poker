import { IIssue, IUser } from './get200Types';

export enum Message {
  chooseIssue = 'chooseIssueMsg',
  createIssue = 'createIssueMsg',
  updateIssue = 'updateIssueMsg',
  deleteIssue = 'deleteIssueMsg',
  startGame = 'startGameMsg',
  changeGameSettings = 'changeGameSettingsMsg',
  changeGameTitle = 'changeTitleMsg',
  endGame = 'endGameMsg',
  createUser = 'createUserMsg',
  chooseUser = 'chooseUserMsg',
  deleteUser = 'deleteUserMsg',
  startRound = 'startRoundMsg',
  restartRound = 'reStartRoundMsg',
  endRound = 'endRoundMsg',
}

export interface IUserMsg {
  event: string;
  payload: IUser;
}

export interface IIssueMsg {
  event: string;
  payload: IIssue;
}
