export enum IssueVoteActionTypes {
  SET_VOTE = 'SET_VOTE',
  SET_VOTE_RESULT = 'SET_VOTE_RESULT',
  CLEAR_VOTE_RESULT = 'CLEAR_VOTE_RESULT',
}

export interface IssueVote {
  vote: {
    key: string;
    value: string;
  };
  gameId: string;
  playerId: string;
  issueId: string;
}

export interface IssueVoteRes {
  vote: {
    key: string;
    value: string;
  };
  _id: string;
  gameId: string;
  playerId: string;
  issueId: string;
}

export interface DefaultStateIssueVote {
  issueVote: IssueVote;
  results: IssueVoteRes[];
}

interface SetIssueVoteAction {
  type: IssueVoteActionTypes.SET_VOTE;
  payload: IssueVote;
}

interface SetIssueVoteResultAction {
  type: IssueVoteActionTypes.SET_VOTE_RESULT;
  payload: IssueVoteRes;
}

interface ClearIssueVoteResultsAction {
  type: IssueVoteActionTypes.CLEAR_VOTE_RESULT;
}

export type IssueVoteActions =
  | SetIssueVoteAction
  | SetIssueVoteResultAction
  | ClearIssueVoteResultsAction;
