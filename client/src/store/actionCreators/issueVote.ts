import { IssueVote, IssueVoteActions, IssueVoteActionTypes } from 'core/types/issueVotesType';
import { Dispatch } from 'redux';

export const setIssueVote = (issueVote: IssueVote) => {
  return (dispatch: Dispatch<IssueVoteActions>): void => {
    dispatch({ type: IssueVoteActionTypes.SET_VOTE, payload: issueVote });
  };
};
