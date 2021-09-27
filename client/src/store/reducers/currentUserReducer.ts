import {
  CurrentUserActions,
  CurrentUserActionType,
  DefaultCurrentUserState,
} from 'core/types/currentUserType';
import { Roles } from 'core/types/roleType';

const defaultState: DefaultCurrentUserState = {
  currentUser: {
<<<<<<< HEAD
    userId: '6151ddf4d4eaac08eca12f35',
    gameId: 'dsf897ef67dyf78w678',
    role: 'creator',
=======
    userId: '',
    gameId: '',
    role: Roles.user,
>>>>>>> 3dafdb5a3deffccb09d0ab45e55b74bac6d4253a
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
