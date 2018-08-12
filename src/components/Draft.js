import React, { Component } from 'react';
import Mail from './Mail';

class Draft extends Component {
  render() {
    const styles = {
      marginLeft: '50px',
    };
    if (!this.props.draftItems.length) {
      return (
        <div style={styles}>
          <h2>Draft</h2>
          No hay mensajes
        </div>
      );
    }
    const items = this.props.draftItems;
    return (
      <div style={styles}>
        <h2>Draft</h2>
        {items.map((item, i) => (
          <Mail item={item} key={i} />
        ))}
      </div>
    );
  }
}

export default Draft;
