const ADD_MAIL_TO_SENT = 'ADD_MAIL_TO_SENT';

//Reducers Sent
const postSent = (state = [], action) => {
  switch (action.type) {
    case ADD_MAIL_TO_SENT:
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

export default postSent;
