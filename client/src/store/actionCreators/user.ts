import { Dispatch } from 'redux';
import { UsersAction, UsersActionTypes } from '../../types/userType';
import { getUsersByGame, getUsersByGameByRole } from '../../api/users.service';
import { Roles } from '../../types/roleType';

export const getUsers = (gameId: string) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.GET_USERS });
      const response = await getUsersByGameByRole(gameId, Roles.user);
      // const response = await axios.get(`users/gameid/${gameId}&user`);
      dispatch({ type: UsersActionTypes.GET_USERS_SUCCESS, payload: response });
    } catch (e) {
      dispatch({
        type: UsersActionTypes.GET_USERS_ERROR,
        payload: 'User loading error',
      });
    }
  };
};
