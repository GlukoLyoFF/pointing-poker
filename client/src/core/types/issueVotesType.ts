export enum IssueVoteActionTypes {
  SET_VOTE = 'SET_VOTE',
  SET_VOTE_ERROR = 'SET_VOTE_ERROR',
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
export interface DefaultStateIssueVote {
  issueVote: IssueVote;
  error: null | string;
}

export interface SetIssueVoteAction {
  type: IssueVoteActionTypes.SET_VOTE;
  payload: IssueVote;
}

interface SetIssueActionError {
  type: IssueVoteActionTypes.SET_VOTE_ERROR;
  payload: string;
}

export type IssueVoteActions = SetIssueVoteAction | SetIssueActionError;
