import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { issuesReducer } from './reducers/issuesReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
