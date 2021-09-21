import { DefaultStateIssues, IssueActionType, IssuesAction } from '../../core/types/issueType';

const defaultState: DefaultStateIssues = {
  issues: [],
  error: null,
};

export const issuesReducer = (state = defaultState, action: IssuesAction) => {
  switch (action.type) {
    case IssueActionType.GET_ISSUES:
      return { error: null, issues: [] };
    case IssueActionType.GET_ISSUES_SUCCESS:
      return { error: null, issues: action.payload };
    case IssueActionType.GET_ISSUES_ERROR:
      return { error: action.payload, issues: [] };
    default:
      return state;
  }
};
