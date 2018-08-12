import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ITEMS } from '../apis/items';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import '../css/autocomplete.css';
class Compose extends Component {
  constructor(props) {
    super(props);
    //initial state of component (to manage form's input)
    //not attached to redux global state
    this.state = {
      email: '',
      subject: '',
      message: '',
      firstName: '',
      lastName: '',
      mailId: '',
      index: '',
      emails: ['descodms@gmail.com', 'otraopcion@gmail.com'],
    };
    //inbox y sent : readOnly true
    //draft y compose : readOnly false
    this.readOnly = false;
  }

  // shouldComponentUpdate = () => {
  //   console.log('should?');
  //   console.log(this.props.params);
  //   // if (!this.props.params.mailId) {
  //   //   return false;
  //   // }
  //   // return true;
  //   // this.reload();
  // };

  //create refs forms
  emailRef = React.createRef();
  messageRef = React.createRef();
  subjectRef = React.createRef();

  //? No me gusta: mejorar
  hackItem = () => {
    const props = this.props.props;
    let mailId = parseInt(this.props.params.mailId, 10);
    let i = props.itemsPaged.findIndex(item => item.id === mailId);
    let item = props.itemsPaged[i] || [];
    if (item.length === 0) {
      i = props.sentItems.findIndex(item => item.id === mailId);
      item = props.sentItems[i] || [];
      this.readOnly = true;
      if (item.length === 0) {
        i = props.draftItems.findIndex(item => item.id === mailId);
        item = props.draftItems[i] || [];
        this.setState({ mailId: item.id, index: i });
        this.setDraftInterval();
        this.readOnly = false;
        if (item.length === 0) {
          i = props.results.findIndex(item => item.id === mailId);
          item = props.results[i] || [];
          this.readOnly = true;
        }
      }
    } else {
      this.readOnly = true;
    }
    this.setState({ firstName: item.firstName, lastName: item.lastName });
    return item;
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
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.subject,
        this.state.message,
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
      return;
    }
    //Compose with data: Inbox, Draft o Sent
    const item = this.hackItem();
    this.setState({
      email: item.email,
      subject: item.subject,
      message: item.message,
    });

    //if readOnly true then cant edit the form
    if (this.readOnly) {
      this.emailRef.current.refInput.setAttribute('readOnly', this.readOnly);
      this.subjectRef.current.setAttribute('readOnly', this.readOnly);
      this.messageRef.current.setAttribute('readOnly', this.readOnly);
    }
  }

  getNames = email => {
    const filter = item => {
      if (item.email === email) {
        return item.firstName;
      }
    };

    const result = ITEMS.filter(filter);
    return result;
  };

  handleInputChange = event => {
    const email = this.emailRef.current.refInput.value.trim();
    const subject = this.subjectRef.current.value;
    const message = this.messageRef.current.value;
    let firstName = '';
    let lastName = '';
    this.setState({
      email,
      subject,
      message,
    });
    const names = this.getNames(email);
    if (!names.length) {
      return;
    }
    firstName = names[0].firstName;
    lastName = names[0].lastName;
    this.setState({
      firstName,
      lastName,
    });
    //si ya existe un mailId corto.
    if (this.state.mailId > 0) {
      return;
    }
    //sino existe mailId, creo un mail nuevo y arranco el setDraftInterval
    if (email.length > 0 || subject.length > 0 || message.length > 0) {
      const mailId = Date.now();
      this.setState({ mailId });
      const { addMailToDraft } = this.props.props;
      addMailToDraft(mailId, firstName, lastName, email, subject, message);
      this.setDraftInterval();
    }
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
    const { addMailToSent, removeMailFromDraft } = this.props.props;
    //call to Sent's action
    addMailToSent(
      Date.now(),
      this.state.firstName,
      this.state.lastName,
      this.emailRef.current.refInput.value,
      this.subjectRef.current.value,
      this.messageRef.current.value,
    );
    //call to Draft's action
    removeMailFromDraft(this.state.mailId, this.state.index);
    //create a new Mail
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
            value={this.state.email}
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
            value={this.state.subject}
            onChange={this.handleInputChange}
          />
        </CardContent>
        <Input
          style={textAreaStyle}
          multiline={true}
          type="text"
          inputRef={this.messageRef}
          placeholder="message"
          value={this.state.message}
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
