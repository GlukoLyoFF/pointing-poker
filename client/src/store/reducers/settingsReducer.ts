import { IGameSettings, SettingsAction, SettingsActionTypes } from '../../core/types/settingsType';

const defaultState: IGameSettings = {
  isAsPlayer: false,
  isChangeCard: false,
  isTimer: true,
  roundTime: 150000,
  scoreType: 'story point',
  shortScoreType: 'SP',
  cardValues: [],
};

export const settingsReducer = (state = defaultState, action: SettingsAction): IGameSettings => {
  switch (action.type) {
    case SettingsActionTypes.GET_SETTINGS:
      return action.payload;
    case SettingsActionTypes.SET_MASTER_PLAYER:
      return { ...state, isAsPlayer: action.payload };
    case SettingsActionTypes.SET_CHANGE_CARD:
      return { ...state, isChangeCard: action.payload };
    case SettingsActionTypes.SET_NEED_TIMER:
      return { ...state, isTimer: action.payload };
    case SettingsActionTypes.SET_SCORE_TYPE:
      return { ...state, scoreType: action.payload };
    case SettingsActionTypes.SET_SHORT_TYPE:
      return { ...state, shortScoreType: action.payload };
    case SettingsActionTypes.SET_ROUND_TIME:
      return { ...state, roundTime: action.payload };
    case SettingsActionTypes.SET_GAME_CARDS:
      return { ...state, cardValues: action.payload };
    case SettingsActionTypes.GET_SETTINGS_ERROR:
      console.error(action.payload);
      return state;
    default:
      return state;
  }
};
