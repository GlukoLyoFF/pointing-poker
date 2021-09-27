import {
  CurrentUserAction,
  DefaultCurrentUserState,
  GetCurrentUserAction,
} from '../../core/types/currentUserType';

const defaultState: DefaultCurrentUserState = {
  currentUser: {
    userId: '6151ddf4d4eaac08eca12f35',
    gameId: 'dsf897ef67dyf78w678',
    role: 'creator',
  },
};

export const currentUserReducer = (state = defaultState, action: GetCurrentUserAction) => {
  switch (action.type) {
    case CurrentUserAction.GET_CURRENT_USER:
      return state;
    default:
      return state;
  }
};
