import { combineReducers } from 'redux';

const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';
const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';

// Reducers Inbox
const requested = (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;
    case FETCH_ITEMS_RESPONSE:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  const entry = {};
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      for (let i = 0; i < action.payload.items.length; i += 1) {
        const item = action.payload.items[i];
        entry[item.id] = item;
      }
      return {
        ...state,
        ...entry,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      return [...state, ...action.payload.items.map(o => o.id)];
    default:
      return state;
  }
};

const errored = (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return false;
    case FETCH_ITEMS_RESPONSE:
      return action.error === true;
    default:
      return state;
  }
};

const currentPage = (state = 0, action) => {
  switch (action.type) {
    case SET_ITEMS_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};

const lastPage = (state = 0, action) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      return action.payload.pageCount - 1;
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  let pageIds;
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      pageIds = action.payload.items.map(item => item.id);
      return {
        ...state,
        [action.payload.page]: pageIds,
      };
    default:
      return state;
  }
};

//export reducers combined
export default combineReducers({
  byId,
  currentPage,
  errored,
  ids,
  lastPage,
  pages,
  requested,
});
