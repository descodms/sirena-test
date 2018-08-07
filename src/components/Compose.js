import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Compose extends Component {
  //initial state of component, not attached to redux global state
  state = {
    toValue: '',
    subjectValue: '',
    messageValue: '',
    flag: '',
    // readOnly: false,
  };

  //create refs forms
  emailRef = React.createRef();
  messageRef = React.createRef();
  subjectRef = React.createRef();

  hackItem = () => {
    const props = this.props.props;
    let mailId = parseInt(this.props.params.mailId, 10);
    let i = props.itemsPaged.findIndex(item => item.id === mailId);
    let item = props.itemsPaged[i] || [];
    let flag = 'inbox';
    // this.setState({ readOnly: true });
    if (item.length === 0) {
      i = props.sentItems.sent.findIndex(item => item.id === mailId);
      item = props.sentItems.sent[i] || [];
      flag = 'sent';
      // this.setState({ readOnly: true });
      if (item.length === 0) {
        i = props.draftItems.draft.findIndex(item => item.id === mailId);
        item = props.draftItems.draft[i] || [];
        flag = 'draft';
        // this.setState({ readOnly: false });
        if (item.length === 0) {
          item = undefined;
          flag = false;
        }
      }
    }
    this.setState({ flag });
    console.log(flag);
    return item;
  };

  setDraftInterval = () => {
    const { addMailToDraft } = this.props;
    this.interval = setInterval(() => {
      //TODO failed attempt to persist Sent and Draft data :(
      // localStorage.setItem('draftItems', JSON.stringify(sentItem));

      //call to draft's action every 10 seconds
      //TODO save only the last version of the same draft
      addMailToDraft(
        Date.now(),
        'defaultdraft',
        'defaultdraft',
        this.emailRef.current.value,
        this.subjectRef.current.value,
        this.messageRef.current.value,
      );
    }, 10000);
  };

  componentDidMount() {
    if (this.props.props === undefined) {
      console.log('this.props undefined?');
      this.setState({ flag: 'compose' });
      this.setDraftInterval();
      return;
    }
    const props = this.props.props;
    const params = this.props.params;
    const item = this.hackItem();
    console.log(item);
    this.setState({
      toValue: item.email,
      subjectValue: item.subject,
      messageValue: item.message,
    });
  }

  componentWillUnmount() {
    //clear the interval
    clearInterval(this.interval);
  }

  /* id: 1,
    firstName: 
    lastName: 
    email:
    message:
    subject: */

  //manage the form
  handleSubmit = () => {
    const sentItem = {
      id: Date.now(),
      firstName: 'defaultsent',
      lastName: 'defaultsent',
      email: this.emailRef.current.value,
      message: this.subjectRef.current.value,
      subject: this.messageRef.current.value,
    };
    // localStorage.setItem('sentItems', JSON.stringify(sentItem));
    const { addMailToSent } = this.props;
    //call to Sent's action
    addMailToSent(
      sentItem.id,
      sentItem.firstName,
      sentItem.lastName,
      this.email,
      this.subject,
      this.message,
    );
    this.statusMessage = 'Mail Enviado!';
  };

  render() {
    if (!this.state.flag) {
      return <h2>No hay mensajes!</h2>;
    }
    //some rushed styles
    const styles = {
      marginLeft: '50px',
      marginTop: '20px',
    };
    const inputStyles = {
      width: '100%',
    };
    const pStyle = {
      marginBottom: '10px',
    };
    return; //material ui components
    <Card style={styles}>
      <CardContent>
        <Input
          style={inputStyles}
          type="text"
          // // readOnly={this.state.readOnly}
          inputRef={this.emailRef}
          placeholder="to"
          value={this.state.toValue}
        />
      </CardContent>
      <CardContent>
        <Input
          style={inputStyles}
          type="text"
          // // readOnly={this.state.readOnly}
          inputRef={this.subjectRef}
          placeholder="subject"
          value={this.state.subjectValue}
        />
      </CardContent>
      <CardContent>
        <Input
          style={inputStyles}
          multiline={true}
          type="text"
          // // readOnly={this.state.readOnly}
          inputRef={this.messageRef}
          placeholder="message"
          value={this.state.messageValue}
        />
      </CardContent>
      <CardContent>
        <Typography style={pStyle}>{this.statusMessage}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
        >
          Send
        </Button>
      </CardContent>
    </Card>;
  }
}

export default Compose;
