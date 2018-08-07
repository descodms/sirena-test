import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDNJIzld1TT4zgMuKcNg9VwiCpB9-tdlKU',
  authDomain: 'sirena-test.firebaseapp.com',
  databaseURL: 'https://sirena-test.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
