export enum IssueActionType {
  GET_ISSUES = 'GET_ISSUES',
  GET_ISSUES_ERROR = 'GET_ISSUES_ERROR',
  GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS',
}

export interface Issue {
  _id: string;
  title: string;
  link: string;
  priority: string;
  gameId: string;
}

export interface DefaultStateIssues {
  issues: Issue[];
  error: null | string;
}

interface GetIssuesAction {
  type: IssueActionType.GET_ISSUES;
}

interface GetIssuesActionSuccess {
  type: IssueActionType.GET_ISSUES_SUCCESS;
  payload: Issue[];
}

interface GetIssuesActionError {
  type: IssueActionType.GET_ISSUES_ERROR;
  payload: string;
}

export type IssuesAction = GetIssuesAction | GetIssuesActionSuccess | GetIssuesActionError;
