import React, { Component } from 'react';
import { Button, Input, Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ITEMS } from '../apis/items';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
class Compose extends Component {
  constructor(props) {
    super(props);
    //initial state of component (to manage form's input)
    //not attached to redux global state
    this.state = {
      toValue: '',
      subjectValue: '',
      messageValue: '',
      mailId: '',
      index: '',
      emails: ['descodms@gmail.com', 'otraopcion@gmail.com'],
    };
    //inbox y sent : readOnly true
    //draft y compose : readOnly false
    this.readOnly = false;

    let emails = [];
  }

  //create refs forms
  emailRef = React.createRef();
  messageRef = React.createRef();
  subjectRef = React.createRef();

  hackItem = () => {
    const props = this.props.props;
    let mailId = parseInt(this.props.params.mailId, 10);
    let i = props.itemsPaged.findIndex(item => item.id === mailId);
    let item = props.itemsPaged[i] || [];
    if (item.length === 0) {
      i = props.sentItems.sent.findIndex(item => item.id === mailId);
      item = props.sentItems.sent[i] || [];
      this.readOnly = true;
      if (item.length === 0) {
        i = props.draftItems.draft.findIndex(item => item.id === mailId);
        item = props.draftItems.draft[i] || [];
        this.readOnly = false;
        this.setState({ mailId: item.id, index: i });
        this.setDraftInterval();
        if (item.length === 0) {
          item = undefined;
        }
      }
    } else {
      this.readOnly = true;
    }
    return item;
  };

  createMailToDraft = () => {
    let mail = {
      id: Date.now(),
      firstName: 'defaultDraftCreateFirst',
      lastName: 'defaultDraftCreateLast',
      email: 'defaultDraftCreateEmail',
      subject: 'defaultDraftCreateSubject',
      message: 'defaultDraftCreateMessage',
    };
    this.setState({ mailId: mail.id });
    const { addMailToDraft } = this.props.props;
    addMailToDraft(
      mail.id,
      mail.firstName,
      mail.lastName,
      mail.email,
      mail.subject,
      mail.message,
    );
  };

  setDraftInterval = () => {
    const { updateMailToDraft } = this.props.props;
    this.interval = setInterval(() => {
      //TODO failed attempt to persist Sent and Draft data :(
      // localStorage.setItem('draftItems', JSON.stringify(sentItem));

      //call to draft's action every 10 seconds
      //TODO save only the last version of the same draft (check in the reducer)
      updateMailToDraft(
        this.state.mailId,
        'defaultdraft',
        'defaultdraft',
        this.emailRef.current.refInput.value,
        this.subjectRef.current.value,
        this.messageRef.current.value,
      );
    }, 10000);
  };

  filterData = data => {
    const filterEmails = item => {
      return item.email;
    };

    const emails = data.map(filterEmails);
    this.emails = emails;
  };

  componentWillMount() {
    this.filterData(ITEMS);
  }

  componentDidMount() {
    if (this.props.params.mailId === undefined) {
      this.createMailToDraft();
      this.setDraftInterval();
      return;
    }
    //Compose with data: Inbox, Draft o Sent
    const item = this.hackItem();
    this.setState({
      toValue: item.email,
      subjectValue: item.subject,
      messageValue: item.message,
    });

    //if readOnly true then cant edit the form
    if (this.readOnly) {
      this.emailRef.current.refInput.setAttribute('readOnly', this.readOnly);
      this.subjectRef.current.setAttribute('readOnly', this.readOnly);
      this.messageRef.current.setAttribute('readOnly', this.readOnly);
    }
  }

  handleInputChange = event => {
    this.setState({
      toValue: this.emailRef.current.refInput.value,
      subjectValue: this.subjectRef.current.value,
      messageValue: this.messageRef.current.value,
    });
  };

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
      email: this.emailRef.current.refInput.value,
      message: this.subjectRef.current.value,
      subject: this.messageRef.current.value,
    };
    const { addMailToSent, removeMailFromDraft } = this.props.props;
    //call to Sent's action
    addMailToSent(
      Date.now(),
      'defaultsent',
      'defaultsent',
      this.emailRef.current.refInput.value,
      this.subjectRef.current.value,
      this.messageRef.current.value,
    );
    //call to Draft's action
    removeMailFromDraft(this.state.mailId, this.state.index);
    //create a new Mail
    // this.createMailToDraft();
    this.statusMessage = 'Mail Enviado!';
  };

  handleRequestOptions = part => {};

  render() {
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
    const textAreaStyle = {
      width: '402px',
      height: '100%',
      marginLeft: '24px',
    };
    const autoInputStyles = {
      width: '402px',
      height: '32px',
      font: 'inherit',
      color: 'currenColor',
      border: 'none',
      borderBottom: '1px solid',
      borderBottomColor: 'initial',
      padding: '6px 0 7px',
      outline: 'none',
    };
    return (
      //material ui components
      <Card style={styles}>
        <CardContent>
          <TextInput
            style={autoInputStyles}
            // onRequestOptions={this.handleRequestOptions}
            options={this.emails}
            trigger=""
            Component="input"
            type="text"
            ref={this.emailRef}
            placeholder="to"
            value={this.state.toValue}
            onChange={this.handleInputChange}
          />
          {/* <Input
            style={inputStyles}
            type="text"
            inputRef={this.emailRef}
            placeholder="to"
            value={this.state.toValue}
            onChange={this.handleInputChange}
          /> */}
        </CardContent>
        <CardContent>
          <Input
            style={inputStyles}
            type="text"
            inputRef={this.subjectRef}
            placeholder="subject"
            value={this.state.subjectValue}
            onChange={this.handleInputChange}
          />
        </CardContent>
        <Input
          style={textAreaStyle}
          multiline={true}
          type="text"
          inputRef={this.messageRef}
          placeholder="message"
          value={this.state.messageValue}
          onChange={this.handleInputChange}
        />
        <CardContent>
          <Typography style={pStyle}>{this.statusMessage}</Typography>
          {!this.readOnly ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Send
            </Button>
          ) : null}
        </CardContent>
      </Card>
    );
  }
}

export default Compose;
