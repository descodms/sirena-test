//combine reducers
import { combineReducers } from '../../../../Library/Caches/typescript/2.9/node_modules/redux';
import draft from './draft';
import sent from './sent';
import items from './inbox';
import search from './search';
// import { reducer } from 'redux-search';

const reducers = combineReducers({
  items,
  draft,
  sent,
  search,
});

export default reducers;
