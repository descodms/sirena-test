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
    // console.log(this.handleFormEvent);
    // console.log(this.emailRef.current.value);
    event.preventDefault();
    this.props.authenticate(
      this.emailRef.current.value,
      this.passRef.current.value,
    );
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleFormEvent}>
          <Input
            name="email"
            inputRef={this.emailRef}
            type="text"
            placeholder="Email"
          />
          <Input
            name="password"
            inputRef={this.passRef}
            type="text"
            placeholder="Password"
          />
          <Button color="secondary" variant="contained" type="submit">
            Go to App →
          </Button>
        </form>
        <div name="error">
          <Typography>{this.props.message}</Typography>
        </div>
      </div>
    );
  }
}

export default Login;