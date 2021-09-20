export enum SettingsActionTypes {
  GET_SETTINGS = 'GET_SETTINGS',
  GET_SETTINGS_ERROR = 'GET_SETTINGS_ERROR',
  SET_SETTINGS = 'SET_SETTINGS',
  SET_MASTER_PLAYER = 'SET_MASTER_PLAYER',
  SET_CHANGE_CARD = 'SET_CHANGE_CARD',
  SET_NEED_TIMER = 'SET_NEED_TIMER',
  SET_ROUND_TIME = 'SET_ROUND_TIME',
  SET_SCORE_TYPE = 'SET_SCORE_TYPE',
  SET_SHORT_TYPE = 'SET_SHORT_TYPE',
  SET_GAME_CARDS = 'SET_GAME_CARDS',
}

export interface IGameSettings {
  isAsPlayer: boolean;
  isChangeCard: boolean;
  isTimer: boolean;
  scoreType: string;
  shortScoreType: string;
  roundTime?: number;
  cardValues: IGameCard[];
}

export interface IGameCard {
  key: string;
  value: string;
}

interface GetSettingsAction {
  type: SettingsActionTypes.GET_SETTINGS;
  payload: IGameSettings;
}

interface GetSettingsErrorAction {
  type: SettingsActionTypes.GET_SETTINGS_ERROR;
  payload: string;
}

interface SetSettingsAction {
  type: SettingsActionTypes.SET_SETTINGS;
  payload: IGameSettings;
}

interface SetMasterPlayerAction {
  type: SettingsActionTypes.SET_MASTER_PLAYER;
  payload: boolean;
}

interface SetChangeCardAction {
  type: SettingsActionTypes.SET_CHANGE_CARD;
  payload: boolean;
}

interface SetNeedTimerAction {
  type: SettingsActionTypes.SET_NEED_TIMER;
  payload: boolean;
}

interface SetScoreTypeAction {
  type: SettingsActionTypes.SET_SCORE_TYPE;
  payload: string;
}

interface SetShortScoreTypeAction {
  type: SettingsActionTypes.SET_SHORT_TYPE;
  payload: string;
}

interface SetRoundTimeAction {
  type: SettingsActionTypes.SET_ROUND_TIME;
  payload: number;
}

interface SetGameCardsAction {
  type: SettingsActionTypes.SET_GAME_CARDS;
  payload: IGameCard[];
}

export type SettingsAction =
  | GetSettingsAction
  | GetSettingsErrorAction
  | SetSettingsAction
  | SetMasterPlayerAction
  | SetChangeCardAction
  | SetNeedTimerAction
  | SetScoreTypeAction
  | SetShortScoreTypeAction
  | SetRoundTimeAction
  | SetGameCardsAction;
