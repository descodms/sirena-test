import React, { Component } from 'react';
import Mail from './Mail';

/* id: 1,
    firstName: 
    lastName: 
    email:
    message:
    subject: */

class Sent extends Component {
  componentDidMount = () => {};

  render() {
    const styles = { marginLeft: '40px' };
    const sentItem = localStorage.getItem('sentItems');
    if (!this.props.sentItems.sent.length) {
      return (
        <div style={styles}>
          <h2>Sent</h2>
          No hay mensajes
        </div>
      );
    }
    const items = this.props.sentItems.sent;
    return (
      <div>
        <ul id="items">
          <h2>Sent</h2>
          {items.map((item, i) => <Mail item={item} key={i} />)}
        </ul>
      </div>
    );
  }
}

export default Sent;
