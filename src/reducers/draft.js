const ADD_MAIL_TO_DRAFT = 'ADD_MAIL_TO_DRAFT';

//Reducers Draft
const postDraft = (state = [], action) => {
  switch (action.type) {
    case ADD_MAIL_TO_DRAFT:
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

    default:
      return state;
  }
};

export default postDraft;
