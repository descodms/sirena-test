import React, { Component } from 'react';
import Mail from './Mail';

class Draft extends Component {
  componentDidMount = () => {};

  render() {
    const styles = {
      marginLeft: '40px',
    };
    if (!this.props.draftItems.draft.length) {
      return (
        <div style={styles}>
          <h2>Draft</h2>
          No hay mensajes
        </div>
      );
    }
    const items = this.props.draftItems.draft;
    return (
      <div>
        <ul id="items">
          <h2>Draft</h2>
          {items.map((item, i) => <Mail item={item} key={i} />)}
        </ul>
      </div>
    );
  }
}

export default Draft;
