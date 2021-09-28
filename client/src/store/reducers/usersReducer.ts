import { DefaultStateUsers, UsersActions, UsersActionTypes } from '../../core/types/userType';

const defaultState: DefaultStateUsers = {
  users: [],
  error: null,
};

export const usersReducer = (state = defaultState, action: UsersActions): DefaultStateUsers => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS:
      return { error: null, users: [] };
    case UsersActionTypes.GET_USERS_SUCCESS:
      return { error: null, users: action.payload };
    case UsersActionTypes.GET_USERS_ERROR:
      return { error: action.payload, users: [] };
    case UsersActionTypes.DELETE_USER:
      return { ...state, users: state.users.filter(elem => elem._id !== action.payload._id) };
    case UsersActionTypes.SET_USER:
      return {
        ...state,
        users: action.payload.role === 'user' ? state.users.concat(action.payload) : state.users,
      };
    default:
      return state;
  }
};
