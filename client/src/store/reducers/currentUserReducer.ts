import {
  CurrentUserActions,
  CurrentUserActionType,
  DefaultCurrentUserState,
} from 'core/types/currentUserType';
import { Roles } from 'core/types/roleType';

const defaultState: DefaultCurrentUserState = {
  currentUser: {
    userId: '',
    gameId: '',
    role: Roles.user,
  },
};

export const currentUserReducer = (state = defaultState, action: CurrentUserActions) => {
  switch (action.type) {
    case CurrentUserActionType.GET_CURRENT_USER:
      return state;
    case CurrentUserActionType.CLEAR_CURRENT_USER:
      return defaultState;
    case CurrentUserActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          userId: action.payload._id,
          gameId: action.payload.gameId,
          role: action.payload.role,
        },
      };
    default:
      return state;
  }
};
