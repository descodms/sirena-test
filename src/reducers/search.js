import { combineReducers } from '../../../../Library/Caches/typescript/2.9/node_modules/redux';

const ADD_MAILS_TO_RESULTS = 'ADD_MAILS_TO_RESULTS';
const REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS';

//Reducers Search
const search = (state = [], action) => {
  switch (action.type) {
    case ADD_MAILS_TO_RESULTS:
      return action.results;
    case REMOVE_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
};

export default search;
