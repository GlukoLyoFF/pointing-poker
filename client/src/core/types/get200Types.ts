import { IGameSettings } from './settingsType';
import { UserRole } from './userType';

export interface IGame {
  _id: string;
  url: string;
  title: string;
  gameSettings: IGameSettings;
}

export interface IUser {
  _id: string;
  role: UserRole;
  image: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  gameId: string;
}

export interface IIssue {
  _id: string;
  title: string;
  link: string;
  gameId: string;
  priority: string;
}
