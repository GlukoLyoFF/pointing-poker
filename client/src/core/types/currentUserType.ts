export enum CurrentUserActionType {
  GET_CURRENT_USER = 'GET_CURREBT_USER',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export interface CurrentUser {
  userId: string;
  gameId: string;
  role: string;
}

export interface DefaultCurrentUserState {
  currentUser: CurrentUser;
}

interface GetCurrentUserAction {
  type: CurrentUserActionType.GET_CURRENT_USER;
}

interface SetCurrentUser {
  type: CurrentUserActionType.SET_CURRENT_USER;
  payload: CurrentUser;
}

export type CurrentUserActions = GetCurrentUserAction | SetCurrentUser;
