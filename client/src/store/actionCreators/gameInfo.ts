import { Dispatch } from 'redux';
import {
  getGameById,
  updateGameById,
  updateGameSettingsById,
  updateGameTitleById,
} from 'core/api/game.service';
import { IGame } from 'core/types/get200Types';
import { GameInfoAction, GameInfoActionType, IGameHeader } from 'core/types/gameInfoType';
import { IGameCard } from 'core/types/settingsType';

const errorAction: GameInfoAction = {
  type: GameInfoActionType.GET_GAME_INFO_ERROR,
  payload: 'Game info loading error. Default settings loaded',
};

export const getGameInfo = (idGame: string) => {
  return async (dispatch: Dispatch<GameInfoAction>): Promise<void> => {
    try {
      const response = await getGameById(idGame);
      dispatch({ type: GameInfoActionType.GET_GAME_INFO, payload: response });
    } catch (e) {
      dispatch(errorAction);
    }
  };
};

export const postGameInfo = (info: IGame) => {
  return async (dispatch: Dispatch<GameInfoAction>): Promise<void> => {
    try {
      const response = await updateGameById(info._id, info);
      dispatch({ type: GameInfoActionType.GET_GAME_INFO, payload: response });
    } catch (e) {
      dispatch(errorAction);
    }
  };
};

export const postGameHeader = (header: IGameHeader) => {
  return async (dispatch: Dispatch<GameInfoAction>): Promise<void> => {
    try {
      const response = await updateGameTitleById(header._id, header);
      dispatch({ type: GameInfoActionType.GET_GAME_INFO, payload: response });
    } catch (e) {
      dispatch(errorAction);
    }
  };
};

export const postGameSettings = (info: IGame) => {
  return async (dispatch: Dispatch<GameInfoAction>): Promise<void> => {
    try {
      const response = await updateGameSettingsById(info._id, info);
      dispatch({ type: GameInfoActionType.GET_GAME_INFO, payload: response });
    } catch (e) {
      dispatch(errorAction);
    }
  };
};

export const setGameTitle = (title: string) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_TITLE, payload: title });
  };
};

export const setGameLink = (link: string) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_LINK, payload: link });
  };
};

export const setSettingIsMasterPlayer = (val: boolean) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_MASTER_PLAYER, payload: val });
  };
};

export const setSettingIsChangeCard = (val: boolean) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_CHANGE_CARD, payload: val });
  };
};

export const setSettingIsTimer = (val: boolean) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_NEED_TIMER, payload: val });
  };
};

export const setSettingRoundTime = (time: number) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_ROUND_TIME, payload: time });
  };
};

export const setSettingScoreType = (scoreType: string) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_SCORE_TYPE, payload: scoreType });
  };
};

export const setSettingShortScoreType = (scoreType: string) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_SHORT_TYPE, payload: scoreType });
  };
};

export const setSettingGameCards = (gameCards: IGameCard[]) => {
  return (dispatch: Dispatch<GameInfoAction>): void => {
    dispatch({ type: GameInfoActionType.SET_GAME_CARDS, payload: gameCards });
  };
};
