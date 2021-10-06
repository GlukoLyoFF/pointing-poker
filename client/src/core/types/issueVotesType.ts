export enum IssueVoteActionTypes {
  SET_VOTE = 'SET_VOTE',
  SET_VOTE_RESULT = 'SET_VOTE_RESULT',
  CLEAR_VOTE_RESULT = 'CLEAR_VOTE_RESULT',
  GET_VOTES = 'GET_VOTES',
  GET_VOTES_ERROR = 'GET_VOTES_ERROR',
  GET_VOTES_SUCCESS = 'GET_VOTES_SUCCESS',
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
  error: string | null;
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

interface GetIssuesVotesAction {
  type: IssueVoteActionTypes.GET_VOTES;
}

interface GetIssuesVotesActionSuccess {
  type: IssueVoteActionTypes.GET_VOTES_SUCCESS;
  payload: IssueVoteRes[];
}

interface GetIssuesVotesActionError {
  type: IssueVoteActionTypes.GET_VOTES_ERROR;
  payload: string;
}

export type IssueVoteActions =
  | SetIssueVoteAction
  | SetIssueVoteResultAction
  | ClearIssueVoteResultsAction
  | GetIssuesVotesAction
  | GetIssuesVotesActionSuccess
  | GetIssuesVotesActionError;
