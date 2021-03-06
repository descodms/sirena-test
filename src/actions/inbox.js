import { createSelector } from 'reselect';

const PAGE_SIZE = 4;

export const getItemsRequested = state => state.items.requested;
export const getItemsErrored = state => state.items.errored;
export const getItem = (state, id) => state.items.byId[id];

const getItemsById = state => state.items.byId;
const getItemsIds = state => state.items.ids;
export const getItems = createSelector(
  [getItemsById, getItemsIds],
  (pById, pIds) => pIds.map(o => pById[o]),
);
export const getItemsCurrentPage = state => state.items.currentPage;
export const getItemsLastPage = state => state.items.lastPage;

const getIsPageFetched = (state, page) => state.items.pages[page] !== undefined;

const getItemsIdsPaged = state => {
  const page = state.items.currentPage;
  const pageIds = state.items.pages[page];
  if (pageIds === undefined) {
    return [];
  }
  return pageIds;
};
//4
export const getItemsPaged = createSelector(
  [getItemsById, getItemsIdsPaged],
  (pById, pIds) => pIds.map(o => pById[o]),
);

const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';
const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';

const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
});

const fetchItemsResponse = (payload, error) => {
  if (error) {
    return {
      error: true,
      payload,
      type: FETCH_ITEMS_RESPONSE,
    };
  }
  return {
    payload,
    type: FETCH_ITEMS_RESPONSE,
  };
};

const setItemsCurrentPage = page => ({
  payload: page,
  type: SET_ITEMS_CURRENT_PAGE,
});

export const fetchItems = (page, name) => (dispatch, getState) => {
  const state = getState();
  const offset = page * PAGE_SIZE;
  dispatch(setItemsCurrentPage(page));
  // if (getIsPageFetched(state, page)) {
  //   return;
  // }
  dispatch(fetchItemsRequest());
  fetchItemsInternal(
    {
      limit: PAGE_SIZE,
      offset,
    },
    name,
  )
    .then(response => {
      const pageCount = Math.ceil(response.count / PAGE_SIZE);
      dispatch(
        fetchItemsResponse({
          items: response.results,
          page,
          pageCount,
        }),
      );
    })
    .catch(() => dispatch(fetchItemsResponse('500', true)));
};

const fetchItemsInternal = (params, instance) => {
  const createPromise = response =>
    new Promise(resolve => {
      window.setTimeout(() => resolve(response), 1000);
    });
  if (params === undefined) {
    const response = {
      count: instance.length,
      results: instance,
    };
    return createPromise(response);
  }
  const { limit } = params;
  const offset = params.offset !== undefined ? params.offset : 0;
  if (limit === undefined) {
    const response = {
      count: instance.length,
      results: instance.slice(offset),
    };
    return createPromise(response);
  }
  const defaultResponse = {
    count: instance.length,
    results: instance.slice(offset, offset + limit),
  };
  return createPromise(defaultResponse);
};
