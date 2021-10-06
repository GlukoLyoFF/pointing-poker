import {
  DefaultStateIssues,
  Issue,
  IssueActionType,
  IssuesAction,
} from '../../core/types/issueType';

const defaultState: DefaultStateIssues = {
  issues: [],
  error: null,
};

const editIssue = (arr: Issue[], elem: Issue) => {
  const index = arr.findIndex(e => e._id === elem._id);
  arr.splice(index, 1, elem);
  return arr;
};

export const issuesReducer = (state = defaultState, action: IssuesAction) => {
  switch (action.type) {
    case IssueActionType.GET_ISSUES:
      return { error: null, issues: [] };
    case IssueActionType.GET_ISSUES_SUCCESS:
      return { error: null, issues: action.payload };
    case IssueActionType.GET_ISSUES_ERROR:
      return { error: action.payload, issues: [] };
    case IssueActionType.SET_ISSUE:
      return { ...state, issues: state.issues.concat(action.payload) };
    case IssueActionType.DELETE_ISSUE:
      return { ...state, issues: state.issues.filter(elem => elem._id !== action.payload._id) };
    case IssueActionType.EDIT_ISSUE:
      return {
        ...state,
        issues: editIssue(state.issues, action.payload),
      };
    default:
      return state;
  }
};
