import { UserRole } from './userType';

export enum CreatorActionTypes {
  GET_CREATOR = 'GET_CREATOR',
  GET_CREATOR_SUCCESS = 'GET_CREATOR_SUCCESS',
  GET_CREATOR_ERROR = 'GET_CREATOR_ERROR',
}

export interface Creator {
  role: UserRole;
  image: string;
  jobPosition: string;
  lastName: string;
  _id: string;
  firstName: string;
  gameId: string;
}

export interface DefaultStateCreator {
  creator: Creator;
  error: null | string;
}

interface GetCreatorAction {
  type: CreatorActionTypes.GET_CREATOR;
}

interface GetCreatorActionSuccess {
  type: CreatorActionTypes.GET_CREATOR_SUCCESS;
  payload: Creator;
}

interface GetCreatorActionError {
  type: CreatorActionTypes.GET_CREATOR_ERROR;
  payload: string;
}

export type CreatorActions = GetCreatorAction | GetCreatorActionSuccess | GetCreatorActionError;
