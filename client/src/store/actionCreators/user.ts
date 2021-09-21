import { Dispatch } from 'redux';
import { UsersAction, UsersActionTypes } from '../../core/types/userType';
import { getUsersByGameByRole } from '../../core/api/users.service';
import { Roles } from '../../core/types/roleType';

export const getUsers = (gameId: string) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.GET_USERS });
      const response = await getUsersByGameByRole(gameId, Roles.user);
      dispatch({ type: UsersActionTypes.GET_USERS_SUCCESS, payload: response });
    } catch (e) {
      dispatch({
        type: UsersActionTypes.GET_USERS_ERROR,
        payload: 'User loading error',
      });
    }
  };
};
