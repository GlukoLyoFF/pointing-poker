import {
  CreatorActions,
  CreatorActionTypes,
  DefaultStateCreator,
} from '../../core/types/creatorType';
import { Roles } from '../../core/types/roleType';

const defaultCreator = {
  role: Roles.creator,
  image: '',
  jobPosition: '',
  lastName: '',
  firstName: '',
  gameId: '',
  _id: '',
};

const defaultState: DefaultStateCreator = {
  creator: defaultCreator,
  error: null,
};

export const creatorReducer = (
  state = defaultState,
  action: CreatorActions,
): DefaultStateCreator => {
  switch (action.type) {
    case CreatorActionTypes.GET_CREATOR:
      return defaultState;
    case CreatorActionTypes.GET_CREATOR_SUCCESS:
      return {
        error: null,
        creator: action.payload,
      };
    case CreatorActionTypes.GET_CREATOR_ERROR:
      return {
        error: action.payload,
        creator: defaultCreator,
      };
    default:
      return state;
  }
};
