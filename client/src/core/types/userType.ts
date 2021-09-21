import { Roles } from './roleType';

export enum UsersActionTypes {
  GET_USERS = 'GET_USERS',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
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

export type UsersAction = GetUsersAction | GetUsersActionSuccess | GetUsersActionError;
