import axios from '../../services/api';
import { Dispatch } from 'redux';
import { UsersAction, UsersActionTypes } from '../../types/userType';

export const getUsers = (gameId: string) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.GET_USERS });
      const response = await axios.get(`users/gameid/${gameId}&user`);
      dispatch({ type: UsersActionTypes.GET_USERS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: UsersActionTypes.GET_USERS_ERROR,
        payload: 'User loading error',
      });
    }
  };
};
