import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import { Redirect } from 'react-router-dom';
import { inbox } from '../apis/inbox';

const KEYS_TO_FILTERS = ['firstName', 'email', 'lastName'];

class SearchBox extends Component {
  searchUpdated = term => {
    if (term.keyCode === 13) {
      const sentItems = this.props.sentItems;
      const draftItems = this.props.draftItems;
      const merge = sentItems.concat(draftItems, inbox);
      this.props.removeSearchResults(this.props.results);
      const filteredEmails = merge.filter(
        createFilter(term.target.value, KEYS_TO_FILTERS),
      );
      this.props.addMailsToResults(filteredEmails);
    }
    return;
  };

  render() {
    const divStyle = {
      marginLeft: '49px',
      marginTop: '10px',
    };
    const searchInputStyle = {
      outline: 'none',
    };
    const search = this.props.results.length ? (
      <Redirect to="/main/results" />
    ) : (
      ''
    );
    return (
      <div style={divStyle}>
        <SearchInput
          style={searchInputStyle}
          className="search-input"
          onKeyDown={this.searchUpdated}
        />
        {search}
      </div>
    );
  }
}

export default SearchBox;
