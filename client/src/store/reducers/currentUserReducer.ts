import {
  CurrentUserActions,
  CurrentUserActionType,
  DefaultCurrentUserState,
} from 'core/types/currentUserType';

const defaultState: DefaultCurrentUserState = {
  currentUser: {
    userId: '614099d1b22b6739b438c717',
    gameId: 'asdfasdfas',
    role: 'creator',
  },
};

export const currentUserReducer = (state = defaultState, action: CurrentUserActions) => {
  switch (action.type) {
    case CurrentUserActionType.GET_CURRENT_USER:
      return state;
    case CurrentUserActionType.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
