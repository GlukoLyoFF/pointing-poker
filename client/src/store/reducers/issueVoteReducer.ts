import {
  DefaultStateIssueVote,
  IssueVoteActions,
  IssueVoteActionTypes,
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
  results: [],
};

export const issueVoteReducer = (
  state = defaultState,
  action: IssueVoteActions,
): DefaultStateIssueVote => {
  switch (action.type) {
    case IssueVoteActionTypes.SET_VOTE:
      return { ...state, issueVote: action.payload };
    case IssueVoteActionTypes.SET_VOTE_RESULT:
      return { ...state, results: [...state.results.concat(action.payload)] };
    case IssueVoteActionTypes.CLEAR_VOTE_RESULT:
      return defaultState;
    default:
      return state;
  }
};
