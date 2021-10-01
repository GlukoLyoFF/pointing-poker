import {
  DefaultStateIssueVote,
  IssueVoteActions,
  IssueVoteActionTypes,
  SetIssueVoteAction,
} from 'core/types/issueVotesType';

const defaultState: DefaultStateIssueVote = {
  issueVote: {
    vote: {
      key: '',
      value: '',
    },
    gameId: '',
    playerId: '',
    issueId: '',
  },
  error: null,
};

export const issueVoteReducer = (
  state = defaultState,
  action: SetIssueVoteAction,
): DefaultStateIssueVote => {
  switch (action.type) {
    case IssueVoteActionTypes.SET_VOTE:
      return { ...state, issueVote: action.payload };
    default:
      return state;
  }
};
