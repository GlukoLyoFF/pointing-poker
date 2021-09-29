import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { creatorReducer } from './reducers/creatorReducer';
import { currentUserReducer } from './reducers/currentUserReducer';
import { gameInfoReducer } from './reducers/gameInfoReducer';
import { issuesReducer } from './reducers/issuesReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  gameInfo: gameInfoReducer,
  users: usersReducer,
  issues: issuesReducer,
  creator: creatorReducer,
  currentUser: currentUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
