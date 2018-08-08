import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Login from './Login';
import Inbox from './Inbox';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

// main container component
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    uid: null,
    statusLoginMessage: '',
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    console.log('App component did mount');
    console.log(this.props);
    console.log(this.state);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = (email, pass) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .then(this.authHandler);
  };

  authHandler = authData => {
    if (!authData) {
      this.setState({ statusLoginMessage: 'ocurrio un error' });
      return;
    }
    this.setState({
      uid: authData.user.uid,
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const Styles = {
      fontFamily: 'Roboto',
      // backgroundImage: 'url(' + imgUrl + ')',
    };
    const NavStyles = {
      width: '300px',
    };
    const divLogout = {
      float: 'right',
    };
    // 1. Check if they are logged in
    if (!this.state.uid) {
      return (
        <div>
          <Login
            authenticate={this.authenticate}
            message={this.state.statusLoginMessage}
          />
          {/* <button onClick={this.logout}>Logout</button> */}
          <Button onClick={this.logout} variant="contained" color="secondary">
            Logout
          </Button>
        </div>
      );
    }

    // 2. user logged in
    return (
      <div style={Styles}>
        <CssBaseline>
          <Navigation logout={this.logout} {...this.props} />
          <div style={divLogout} />
        </CssBaseline>
      </div>
    );
  }
}

export default App;
