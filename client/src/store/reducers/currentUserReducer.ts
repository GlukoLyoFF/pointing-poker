import {
  CurrentUserAction,
  DefaultCurrentUserState,
  GetCurrentUserAction,
} from '../../core/types/currentUserType';

const defaultState: DefaultCurrentUserState = {
  currentUser: {
    userId: '614099d1b22b6739b438c717',
    gameId: 'asdfasdfas',
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
