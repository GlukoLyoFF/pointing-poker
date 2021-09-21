import { Dispatch } from 'redux';
import { getGameById, updateGameById } from '../../core/api/game.service';
import { IGame } from '../../core/types/get200Types';
import { IGameCard, SettingsAction, SettingsActionTypes } from '../../core/types/settingsType';

export const getGameSettings = (idGame: string) => {
  return async (dispatch: Dispatch<SettingsAction>): Promise<void> => {
    try {
      const response = await getGameById(idGame);
      dispatch({ type: SettingsActionTypes.GET_SETTINGS, payload: response.gameSettings });
    } catch (e) {
      dispatch({
        type: SettingsActionTypes.GET_SETTINGS_ERROR,
        payload: 'Settings loading error. Default settings loaded',
      });
    }
  };
};

export const setGameSettings = (settings: IGame) => {
  return async (dispatch: Dispatch<SettingsAction>): Promise<void> => {
    try {
      const response = await updateGameById(settings._id, settings);
      dispatch({ type: SettingsActionTypes.GET_SETTINGS, payload: response.gameSettings });
    } catch (e) {
      dispatch({
        type: SettingsActionTypes.GET_SETTINGS_ERROR,
        payload: 'Settings loading error. Default settings loaded',
      });
    }
  };
};

export const setSettingIsMasterPlayer = (val: boolean) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_MASTER_PLAYER, payload: val });
  };
};

export const setSettingIsChangeCard = (val: boolean) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_CHANGE_CARD, payload: val });
  };
};

export const setSettingIsTimer = (val: boolean) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_NEED_TIMER, payload: val });
  };
};

export const setSettingRoundTime = (time: number) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_ROUND_TIME, payload: time });
  };
};

export const setSettingScoreType = (scoreType: string) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_SCORE_TYPE, payload: scoreType });
  };
};

export const setSettingShortScoreType = (scoreType: string) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_SHORT_TYPE, payload: scoreType });
  };
};

export const setSettingGameCards = (gameCards: IGameCard[]) => {
  return (dispatch: Dispatch<SettingsAction>): void => {
    dispatch({ type: SettingsActionTypes.SET_GAME_CARDS, payload: gameCards });
  };
};
