const ADD_MAIL_TO_DRAFT = 'ADD_MAIL_TO_DRAFT';
const UPDATE_MAIL_TO_DRAFT = 'UPDATE_MAIL_TO_DRAFT';
const REMOVE_MAIL_FROM_DRAFT = 'REMOVE_MAIL_FROM_DRAFT';

//Reducers Draft
const postDraft = (state = [], action) => {
  switch (action.type) {
    case ADD_MAIL_TO_DRAFT:
      //action.id === false, update, no create
      return [
        ...state,
        {
          id: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          email: action.email,
          subject: action.subject,
          message: action.message,
        },
      ];
    case UPDATE_MAIL_TO_DRAFT:
      return state.map((item, index) => {
        if (item.id === action.id) {
          return { ...action };
        }
        return item;
      });
    case REMOVE_MAIL_FROM_DRAFT:
      return [
        //from the start the one to delete
        ...state.slice(0, action.index),
        //after the deleted one, to the end
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default postDraft;
