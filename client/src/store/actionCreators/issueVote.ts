import {
  IssueVote,
  IssueVoteActions,
  IssueVoteActionTypes,
  IssueVoteRes,
} from 'core/types/issueVotesType';
import { Dispatch } from 'redux';

export const setIssueVote = (issueVote: IssueVote) => {
  return (dispatch: Dispatch<IssueVoteActions>): void => {
    dispatch({ type: IssueVoteActionTypes.SET_VOTE, payload: issueVote });
  };
};

export const setIssueVoteResult = (issueResult: IssueVoteRes) => {
  return (dispatch: Dispatch<IssueVoteActions>): void => {
    dispatch({ type: IssueVoteActionTypes.SET_VOTE_RESULT, payload: issueResult });
  };
};

export const clearIssueVoteResult = () => {
  return (dispatch: Dispatch<IssueVoteActions>): void => {
    dispatch({ type: IssueVoteActionTypes.CLEAR_VOTE_RESULT });
  };
};
