import { CurrentUser, CurrentUserActions, CurrentUserActionType } from 'core/types/currentUserType';
import { Dispatch } from 'react';

export const setCurrentUser = (currentUser: CurrentUser) => {
  return (dispatch: Dispatch<CurrentUserActions>): void => {
    dispatch({ type: CurrentUserActionType.SET_CURRENT_USER, payload: currentUser });
  };
};
