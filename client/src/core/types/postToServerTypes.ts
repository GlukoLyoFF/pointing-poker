import { IGameSettings } from './settingsType';

export interface IGameBody {
  _id?: string;
  url?: string;
  title?: string;
  gameSettings?: IGameSettings;
}

export interface IUserBody {
  _id?: string;
  role?: string;
  image?: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  gameId: string;
}

export interface IIssueBody {
  _id?: string;
  title: string;
  link: string;
  gameId: string;
  priority: string;
}

export interface IIssueVoteBody {
  vote: {
    key: string;
    value: string;
  };
  gameId: string;
  playerId: string;
  issueId: string;
}
