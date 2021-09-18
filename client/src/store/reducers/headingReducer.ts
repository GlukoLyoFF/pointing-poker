import { DefaultHeadingState, HeadingActions, HeadingActionType } from '../../types/headingType';

const defaultState: DefaultHeadingState = {
  heading: {
    _id: '',
    heading: '',
    gameId: '',
  },
  error: null,
};

export const headingReduser = (state = defaultState, action: HeadingActions) => {
  switch (action.type) {
    case HeadingActionType.SET_HEADING:
      return { ...state, heading: action.payload };
    default:
      return state;
  }
};
