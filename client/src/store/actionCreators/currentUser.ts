import { CurrentUserActions, CurrentUserActionType } from 'core/types/currentUserType';
import { IUser } from 'core/types/get200Types';
import { Dispatch } from 'react';

export const setCurrentUser = (currentUser: IUser) => {
  return (dispatch: Dispatch<CurrentUserActions>): void => {
    dispatch({ type: CurrentUserActionType.SET_CURRENT_USER, payload: currentUser });
  };
};

export const clearCurrentUser = (user: IUser) => {
  return (dispatch: Dispatch<CurrentUserActions>): void => {
    dispatch({ type: CurrentUserActionType.CLEAR_CURRENT_USER, payload: user });
  };
};
