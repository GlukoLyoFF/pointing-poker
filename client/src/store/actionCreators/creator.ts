import { Dispatch } from 'redux';
import { getUsersByGameByRole } from 'core/api/users.service';
import { CreatorActions, CreatorActionTypes } from 'core/types/creatorType';
import { Roles } from 'core/types/roleType';

export const getCreator = (gameId: string) => {
  return async (dispatch: Dispatch<CreatorActions>): Promise<void> => {
    try {
      dispatch({ type: CreatorActionTypes.GET_CREATOR });
      const response = await getUsersByGameByRole(gameId, Roles.creator);
      dispatch({ type: CreatorActionTypes.GET_CREATOR_SUCCESS, payload: response[0] });
    } catch (e) {
      dispatch({
        type: CreatorActionTypes.GET_CREATOR_ERROR,
        payload: 'Creator loading error',
      });
    }
  };
};
