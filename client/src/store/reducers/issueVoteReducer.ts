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
  error: null,
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
    case IssueVoteActionTypes.GET_VOTES:
      return { issueVote: defaultState.issueVote, error: null, results: [] };
    case IssueVoteActionTypes.GET_VOTES_SUCCESS:
      return { issueVote: defaultState.issueVote, error: null, results: action.payload };
    case IssueVoteActionTypes.GET_VOTES_ERROR:
      return { issueVote: defaultState.issueVote, error: action.payload, results: [] };
    default:
      return state;
  }
};
