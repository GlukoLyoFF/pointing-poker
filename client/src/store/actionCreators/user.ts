import { Dispatch } from 'redux';
import { User, UsersActions, UsersActionTypes } from 'core/types/userType';
import { getUsersByGameByRole } from 'core/api/users.service';
import { Roles } from 'core/types/roleType';

export const getUsers = (gameId: string) => {
  return async (dispatch: Dispatch<UsersActions>) => {
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

export const deleteUser = (user: User) => {
  return (dispatch: Dispatch<UsersActions>): void => {
    dispatch({ type: UsersActionTypes.DELETE_USER, payload: user });
  };
};

export const setUser = (user: User) => {
  return (dispatch: Dispatch<UsersActions>): void => {
    dispatch({ type: UsersActionTypes.SET_USER, payload: user });
  };
};
