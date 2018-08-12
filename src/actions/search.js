const ADD_MAILS_TO_RESULTS = 'ADD_MAILS_TO_RESULTS';
const REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS';

export const addMailsToResults = results => {
  return {
    type: ADD_MAILS_TO_RESULTS,
    results,
  };
};

export const removeSearchResults = results => {
  return {
    type: REMOVE_SEARCH_RESULTS,
    results,
  };
};
