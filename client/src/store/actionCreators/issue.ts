import { Dispatch } from 'react';
import { getIssuesByGame } from '../../core/api/issues.service';
import { IssueActionType, IssuesAction } from '../../core/types/issueType';

export const getIssues = (gameId: string) => {
  return async (dispatch: Dispatch<IssuesAction>): Promise<void> => {
    try {
      dispatch({ type: IssueActionType.GET_ISSUES });
      const response = await getIssuesByGame(gameId);
      dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: response });
    } catch {
      dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: 'Issue loading error' });
    }
  };
};
