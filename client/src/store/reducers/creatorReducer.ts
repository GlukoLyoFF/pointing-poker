import { CreatorActions, CreatorActionTypes, DefaultStateCreator } from '../../types/creatorType';

const defaultState: DefaultStateCreator = {
  creator: {
    role: '',
    image: '',
    jobPosition: '',
    lastName: '',
    firstName: '',
    gameId: '',
    _id: '',
  },
  error: null,
};

export const creatorReducer = (
  state = defaultState,
  action: CreatorActions,
): DefaultStateCreator => {
  switch (action.type) {
    case CreatorActionTypes.GET_CREATOR:
      return {
        error: null,
        creator: {
          role: '',
          image: '',
          jobPosition: '',
          lastName: '',
          firstName: '',
          gameId: '',
          _id: '',
        },
      };
    case CreatorActionTypes.GET_CREATOR_SUCCESS:
      return { error: null, creator: action.payload };
    case CreatorActionTypes.GET_CREATOR_ERROR:
      return {
        error: action.payload,
        creator: {
          role: '',
          image: '',
          jobPosition: '',
          lastName: '',
          firstName: '',
          gameId: '',
          _id: '',
        },
      };
    default:
      return state;
  }
};
