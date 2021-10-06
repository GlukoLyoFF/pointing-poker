import { Roles } from './roleType';

export enum UsersActionTypes {
  GET_USERS = 'GET_USERS',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
  DELETE_USER = 'DELETE_USER',
  SET_USER = 'SET_USUER',
}

export interface User {
  role?: UserRole;
  image?: string;
  jobPosition?: string;
  lastName?: string;
  firstName: string;
  gameId: string;
  _id: string;
}

export type UserRole = Roles.creator | Roles.observer | Roles.user;

export interface DefaultStateUsers {
  users: User[];
  error: null | string;
}

interface GetUsersAction {
  type: UsersActionTypes.GET_USERS;
}

interface GetUsersActionSuccess {
  type: UsersActionTypes.GET_USERS_SUCCESS;
  payload: User[];
}

interface GetUsersActionError {
  type: UsersActionTypes.GET_USERS_ERROR;
  payload: string;
}

interface DeleteUserAction {
  type: UsersActionTypes.DELETE_USER;
  payload: User;
}

interface SetUserAction {
  type: UsersActionTypes.SET_USER;
  payload: User;
}

export type UsersActions =
  | GetUsersAction
  | GetUsersActionSuccess
  | GetUsersActionError
  | DeleteUserAction
  | SetUserAction;
