const ADD_MAIL_TO_SENT = 'ADD_MAIL_TO_SENT';

export const addMailToSent = (
  id,
  firstName,
  lastName,
  email,
  subject,
  message,
) => {
  return {
    type: ADD_MAIL_TO_SENT,
    id,
    firstName,
    lastName,
    email,
    subject,
    message,
  };
};
