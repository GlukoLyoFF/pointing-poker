import { Dispatch } from 'redux';
import axios from '../../services/api';
import { CreatorActions, CreatorActionTypes } from '../../types/creatorType';

export const getCreator = (gameId: string) => {
  return async (dispatch: Dispatch<CreatorActions>) => {
    try {
      dispatch({ type: CreatorActionTypes.GET_CREATOR });
      const response = await axios.get(`users/gameid/${gameId}&creator`);
      dispatch({ type: CreatorActionTypes.GET_CREATOR_SUCCESS, payload: response.data[0] });
    } catch (e) {
      dispatch({
        type: CreatorActionTypes.GET_CREATOR_ERROR,
        payload: 'Creator loading error',
      });
    }
  };
};
