import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { creatorReducer } from './reducers/creatorReducer';
import { currentUserReducer } from './reducers/currentUserReducer';
import { headingReduser } from './reducers/headingReducer';
import { issuesReducer } from './reducers/issuesReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  issues: issuesReducer,
  heading: headingReduser,
  creator: creatorReducer,
  currentUser: currentUserReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
