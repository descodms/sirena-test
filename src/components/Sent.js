import React, { Component } from 'react';
import Mail from './Mail';

class Sent extends Component {
  render() {
    console.log(this.props);

    const styles = { marginLeft: '50px' };
    if (!this.props.sentItems.length) {
      return (
        <div style={styles}>
          <h2>Sent</h2>
          No hay mensajes
        </div>
      );
    }
    const items = this.props.sentItems;
    return (
      <div style={styles}>
        <h2>Sent</h2>
        {items.map((item, i) => (
          <Mail item={item} key={i} />
        ))}
      </div>
    );
  }
}

export default Sent;
