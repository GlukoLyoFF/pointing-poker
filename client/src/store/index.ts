import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { headingReduser } from './reducers/headingReducer';
import { issuesReducer } from './reducers/issuesReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  issues: issuesReducer,
  heading: headingReduser,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
