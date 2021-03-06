import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

//Apps's child component
class Login extends React.Component {
  static propTypes = {
    handleForm: PropTypes.func,
  };

  emailRef = React.createRef();
  passRef = React.createRef();

  handleFormEvent = event => {
    event.preventDefault();
    this.props.authenticate(
      this.emailRef.current.value,
      this.passRef.current.value,
    );
  };

  render() {
    const loginStyles = {
      fontSize: '2rem',
    };
    const messageStyles = {
      color: 'red',
    };
    const buttonStyles = {
      marginLeft: '10px',
    };
    return (
      <div>
        <Typography style={loginStyles}>Login</Typography>
        <form onSubmit={this.handleFormEvent}>
          <Input
            name="email"
            inputRef={this.emailRef}
            type="text"
            placeholder="Email"
          />
          <Input
            style={buttonStyles}
            name="password"
            inputRef={this.passRef}
            type="password"
            placeholder="Password"
          />
          <Button
            style={buttonStyles}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Go to App →
          </Button>
        </form>
        <div name="error">
          <Typography style={messageStyles}>{this.props.message}</Typography>
        </div>
      </div>
    );
  }
}

export default Login;
