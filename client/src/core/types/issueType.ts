export enum IssueActionType {
  GET_ISSUES = 'GET_ISSUES',
  GET_ISSUES_ERROR = 'GET_ISSUES_ERROR',
  GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS',
  SET_ISSUE = 'SET_ISSUE',
  DELETE_ISSUE = 'DELETE_ISSUE',
  EDIT_ISSUE = 'EDIT_ISSUE',
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

interface SetIssueAction {
  type: IssueActionType.SET_ISSUE;
  payload: Issue;
}

interface DeleteIssueAction {
  type: IssueActionType.DELETE_ISSUE;
  payload: Issue;
}

interface EditIssueAction {
  type: IssueActionType.EDIT_ISSUE;
  payload: Issue;
}

export type IssuesAction =
  | GetIssuesAction
  | GetIssuesActionSuccess
  | GetIssuesActionError
  | SetIssueAction
  | DeleteIssueAction
  | EditIssueAction;
