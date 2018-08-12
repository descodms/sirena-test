import React, { Component } from 'react';
import Mail from './Mail';

class Search extends Component {
  render() {
    const styles = {
      marginLeft: '40px',
    };
    if (this.props.results.length === 0) {
      return (
        <div style={styles}>
          <h2>Search</h2>
          No hay mensajes
        </div>
      );
    }
    const items = this.props.results;
    return (
      <div>
        <ul id="items">
          <h2>Search Results</h2>
          {items.map((item, i) => (
            <Mail item={item} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
