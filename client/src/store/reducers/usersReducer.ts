import { DefaultStateUsers, UsersAction, UsersActionTypes } from '../../types/userType';

const defaultState: DefaultStateUsers = {
  users: [],
  error: null,
};

export const usersReducer = (state = defaultState, action: UsersAction): DefaultStateUsers => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS:
      return { error: null, users: [] };
    case UsersActionTypes.GET_USERS_SUCCESS:
      return { error: null, users: action.payload };
    case UsersActionTypes.GET_USERS_ERROR:
      return { error: action.payload, users: [] };
    default:
      return state;
  }
};
