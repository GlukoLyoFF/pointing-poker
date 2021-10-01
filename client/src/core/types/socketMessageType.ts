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
  addVoteByPlayer = 'addVoteByPlayerMsg',
  deleteVoteByPlayer = 'deleteVoteByPlayerMsg',
  changeVoteByPlayer = 'changeVoteByPlayerMsg',
  addVoteByIssue = 'addVoteByIssueMsg',
  deleteVoteByIssue = 'deleteVoteByIssueMsg',
  changeVoteByIssue = 'changeVoteByIssueMsg',
  finishGame = 'finishGame',
  finishGameMsg = 'finishGameMsg',
}

export interface IUserMsg {
  event: string;
  payload: IUser;
}

export interface IIssueMsg {
  event: string;
  payload: IIssue;
}

export interface ITimerMsg {
  event: string;
  payload: string;
}
