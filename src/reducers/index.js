//combine reducers
import { combineReducers } from 'redux';
import draft from './draft';
import sent from './sent';
import items from './inbox';

const reducers = combineReducers({
  items,
  draft,
  sent,
});

export default reducers;
