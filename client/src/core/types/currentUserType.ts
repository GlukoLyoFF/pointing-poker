export enum CurrentUserAction {
  GET_CURRENT_USER = 'GET_CURREBT_USER',
}

export interface CurrentUser {
  userId: string;
  gameId: string;
  role: string;
}

export interface DefaultCurrentUserState {
  currentUser: CurrentUser;
}

export interface GetCurrentUserAction {
  type: CurrentUserAction.GET_CURRENT_USER;
  payload: CurrentUser;
}
