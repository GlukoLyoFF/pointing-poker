import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import LocalStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { creatorReducer } from './reducers/creatorReducer';
import { currentUserReducer } from './reducers/currentUserReducer';
import { gameInfoReducer } from './reducers/gameInfoReducer';
import { issuesReducer } from './reducers/issuesReducer';
import { issueVoteReducer } from './reducers/issueVoteReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  gameInfo: gameInfoReducer,
  users: usersReducer,
  issues: issuesReducer,
  creator: creatorReducer,
  currentUser: currentUserReducer,
  issueVote: issueVoteReducer,
});

const persistConfig = {
  key: 'root',
  storage: LocalStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
