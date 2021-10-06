import { getIssueVotesByGameId } from 'core/api/issueVote.service';
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

export const getIssuesVotesResult = (gameId: string) => {
  return async (dispatch: Dispatch<IssueVoteActions>): Promise<void> => {
    try {
      dispatch({ type: IssueVoteActionTypes.GET_VOTES });
      const response = await getIssueVotesByGameId(gameId);
      dispatch({ type: IssueVoteActionTypes.GET_VOTES_SUCCESS, payload: response });
    } catch {
      dispatch({
        type: IssueVoteActionTypes.GET_VOTES_ERROR,
        payload: 'Issue votes loading error',
      });
    }
  };
};
