import { Dispatch } from 'react';
import { getIssuesByGame } from 'core/api/issues.service';
<<<<<<< HEAD
import { Issue, IssueActionType, IssuesAction } from 'core/types/issueType';
=======
import { IssueActionType, IssuesAction } from 'core/types/issueType';
>>>>>>> 3dafdb5a3deffccb09d0ab45e55b74bac6d4253a

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

export const setIssue = (issue: Issue) => {
  return (dispatch: Dispatch<IssuesAction>): void => {
    dispatch({ type: IssueActionType.SET_ISSUE, payload: issue });
  };
};

export const deleteIssue = (issue: Issue) => {
  return (dispatch: Dispatch<IssuesAction>): void => {
    dispatch({ type: IssueActionType.DELETE_ISSUE, payload: issue });
  };
};

export const editIssue = (issue: Issue) => {
  return (dispatch: Dispatch<IssuesAction>): void => {
    dispatch({ type: IssueActionType.EDIT_ISSUE, payload: issue });
  };
};
