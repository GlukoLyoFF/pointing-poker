import { IIssue, IUser } from './get200Types';
import { IssueVoteRes } from './issueVotesType';

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
  DeleteIssueVotesByIssueId = 'deleteIssueVotesByIssueId',
  DeleteIssueVotesByIssueIdMsg = 'deleteIssueVotesByIssueIdMsg',
  StartVotingByPlayer = 'startVotingByPlayer',
  StartVotingByPlayerMsg = 'startVotingByPlayerMsg',
  FinishVotingByPlayer = 'finishVotingByPlayer',
  FinishVotingByPlayerMsg = 'finishVotingByPlayerMsg',
}

export interface IUserMsg {
  event: string;
  payload: IUser;
}

export interface IIssueMsg {
  event: string;
  payload: IIssue;
}

<<<<<<< HEAD
export interface ITimerMsg {
  event: string;
  payload: string;
}

export interface IDeleteIssueVoteMsg {
  event: string;
  payload: string;
}

export interface IVoteIssueMsg {
  event: string;
  payload: IssueVoteRes;
=======
export interface IChatMsg {
  event: string;
  payload: {
    user: IUser;
    message: string;
  };
>>>>>>> c8977508b2d7109eea22c930f157e6a538fadc50
}
