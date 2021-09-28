import { DefaultGameInfoState, GameInfoAction, GameInfoActionType } from 'core/types/gameInfoType';

const defaultState: DefaultGameInfoState = {
  gameInfo: {
    _id: '',
    url: '',
    title: 'Default game title',
    gameSettings: {
      isAsPlayer: false,
      isChangeCard: false,
      isTimer: false,
      roundTime: 150000,
      scoreType: 'story point',
      shortScoreType: 'SP',
      cardValues: [],
    },
  },
  error: null,
};

export const gameInfoReducer = (
  state = defaultState,
  action: GameInfoAction,
): DefaultGameInfoState => {
  switch (action.type) {
    case GameInfoActionType.GET_GAME_INFO:
      return { error: null, gameInfo: action.payload };
    case GameInfoActionType.SET_TITLE:
      return { ...state, gameInfo: { ...state.gameInfo, title: action.payload } };
    case GameInfoActionType.SET_LINK:
      return { ...state, gameInfo: { ...state.gameInfo, url: action.payload } };
    case GameInfoActionType.SET_MASTER_PLAYER:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, isAsPlayer: action.payload },
        },
      };
    case GameInfoActionType.SET_CHANGE_CARD:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, isChangeCard: action.payload },
        },
      };
    case GameInfoActionType.SET_NEED_TIMER:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, isTimer: action.payload },
        },
      };
    case GameInfoActionType.SET_SCORE_TYPE:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, scoreType: action.payload },
        },
      };
    case GameInfoActionType.SET_SHORT_TYPE:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, shortScoreType: action.payload },
        },
      };
    case GameInfoActionType.SET_ROUND_TIME:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, roundTime: action.payload },
        },
      };
    case GameInfoActionType.SET_GAME_CARDS:
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          gameSettings: { ...state.gameInfo.gameSettings, cardValues: action.payload },
        },
      };
    case GameInfoActionType.GET_GAME_INFO_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
