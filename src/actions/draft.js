const ADD_MAIL_TO_DRAFT = 'ADD_MAIL_TO_DRAFT';

export const addMailToDraft = (
  id,
  firstName,
  lastName,
  email,
  subject,
  message,
) => {
  return {
    type: ADD_MAIL_TO_DRAFT,
    id,
    firstName,
    lastName,
    email,
    subject,
    message,
  };
};
