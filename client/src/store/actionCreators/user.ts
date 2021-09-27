import { Dispatch } from 'redux';
<<<<<<< HEAD
import { User, UsersActions, UsersActionTypes } from 'core/types/userType';
import { getUsersByGameByRole } from '../../core/api/users.service';
=======
import { UsersAction, UsersActionTypes } from 'core/types/userType';
import { getUsersByGameByRole } from 'core/api/users.service';
>>>>>>> 3dafdb5a3deffccb09d0ab45e55b74bac6d4253a
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
    console.log(user);
    dispatch({ type: UsersActionTypes.DELETE_USER, payload: user });
  };
};
