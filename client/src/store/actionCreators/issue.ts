import { Dispatch } from 'react';
import axios from '../../services/api';
import { IssueActionType, IssuesAction } from '../../types/issueType';

export const getIssues = (gameId: string) => {
  return async (dispatch: Dispatch<IssuesAction>) => {
    try {
      dispatch({ type: IssueActionType.GET_ISSUES });
      const response = await axios.get(`issues/gameId/${gameId}`);
      dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: 'Issue loading error' });
    }
  };
};
