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

<<<<<<< HEAD
export interface IIssueVoteBody {
  vote: {
    key: string;
    value: string;
  };
  gameId: string;
  playerId: string;
  issueId: string;
=======
export interface IPlayerVote {
  gameId: string;
  playerId: string;
  targetId: string;
  vote?: boolean;
>>>>>>> c8977508b2d7109eea22c930f157e6a538fadc50
}
