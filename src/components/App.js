import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Login from './Login';
import firebase from 'firebase';
import { firebaseApp } from '../base';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route } from 'react-router-dom';

// main container component
class App extends React.Component {
  state = {
    uid: null,
    statusLoginMessage: '',
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
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
      .catch(function(error) {})
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
    const divLogout = {
      float: 'right',
    };
    const divContent = { width: '500px', float: 'left', marginBottom: '40px' };

    // 1. Check if they are logged in
    if (!this.state.uid) {
      return (
        <div>
          <Login
            authenticate={this.authenticate}
            message={this.state.statusLoginMessage}
          />
        </div>
      );
    }

    // 2. user logged in
    return (
      <div style={Styles}>
        <CssBaseline>
          <Navigation logout={this.logout} {...this.props} />
          <div style={divContent} />
          <div style={divLogout} />
        </CssBaseline>
      </div>
    );
  }
}

export default App;
