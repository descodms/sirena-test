const ADD_MAIL_TO_DRAFT = 'ADD_MAIL_TO_DRAFT';
const UPDATE_MAIL_TO_DRAFT = 'UPDATE_MAIL_TO_DRAFT';
const REMOVE_MAIL_FROM_DRAFT = 'REMOVE_MAIL_FROM_DRAFT';

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

export const updateMailToDraft = (
  id,
  firstName,
  lastName,
  email,
  subject,
  message,
) => {
  return {
    type: UPDATE_MAIL_TO_DRAFT,
    id,
    firstName,
    lastName,
    email,
    subject,
    message,
  };
};

export const removeMailFromDraft = (mailId, index) => {
  return {
    type: REMOVE_MAIL_FROM_DRAFT,
    mailId,
    index,
  };
};
