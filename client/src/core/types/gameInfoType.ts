import { IGame } from './get200Types';
import { IGameCard } from './settingsType';

export enum GameInfoActionType {
  GET_GAME_INFO = 'GET_GAME_INFO',
  GET_GAME_INFO_ERROR = 'GET_GAME_INFO_ERROR',
  SET_TITLE = 'SET_TITLE',
  SET_LINK = 'SET_LINK',
  SET_MASTER_PLAYER = 'SET_MASTER_PLAYER',
  SET_CHANGE_CARD = 'SET_CHANGE_CARD',
  SET_NEED_TIMER = 'SET_NEED_TIMER',
  SET_ROUND_TIME = 'SET_ROUND_TIME',
  SET_SCORE_TYPE = 'SET_SCORE_TYPE',
  SET_SHORT_TYPE = 'SET_SHORT_TYPE',
  SET_GAME_CARDS = 'SET_GAME_CARDS',
}

export interface IGameHeader {
  _id: string;
  url: string;
  title: string;
}

export interface DefaultGameInfoState {
  gameInfo: IGame;
  error: string | null;
}

interface GetGameInfoAction {
  type: GameInfoActionType.GET_GAME_INFO;
  payload: IGame;
}

interface GetGameInfoErrorAction {
  type: GameInfoActionType.GET_GAME_INFO_ERROR;
  payload: string;
}

interface SetTitleAction {
  type: GameInfoActionType.SET_TITLE;
  payload: string;
}

interface SetLinkAction {
  type: GameInfoActionType.SET_LINK;
  payload: string;
}

interface SetMasterPlayerAction {
  type: GameInfoActionType.SET_MASTER_PLAYER;
  payload: boolean;
}

interface SetChangeCardAction {
  type: GameInfoActionType.SET_CHANGE_CARD;
  payload: boolean;
}

interface SetNeedTimerAction {
  type: GameInfoActionType.SET_NEED_TIMER;
  payload: boolean;
}

interface SetScoreTypeAction {
  type: GameInfoActionType.SET_SCORE_TYPE;
  payload: string;
}

interface SetShortScoreTypeAction {
  type: GameInfoActionType.SET_SHORT_TYPE;
  payload: string;
}

interface SetRoundTimeAction {
  type: GameInfoActionType.SET_ROUND_TIME;
  payload: number;
}

interface SetGameCardsAction {
  type: GameInfoActionType.SET_GAME_CARDS;
  payload: IGameCard[];
}

export type GameInfoAction =
  | GetGameInfoAction
  | GetGameInfoErrorAction
  | SetTitleAction
  | SetLinkAction
  | SetMasterPlayerAction
  | SetChangeCardAction
  | SetNeedTimerAction
  | SetScoreTypeAction
  | SetShortScoreTypeAction
  | SetRoundTimeAction
  | SetGameCardsAction;
