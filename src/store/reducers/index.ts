import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import * as users from './users';

export const Types = {
  ...users.Types,
};

export const Actions = {
  users: users.Actions,
};

const rootReducer = combineReducers({
  users: users.default,
});

export type RootReducer = StateType<typeof rootReducer>;

export default rootReducer;
