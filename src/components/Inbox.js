import React, { Component } from 'react';
import Mail from './Mail';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Container Component Inbox
class Inbox extends Component {
  componentDidMount = () => {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage);
    console.log('fetchItems');
  };

  handleNext = () => {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage + 1);
  };

  handlePrevious = () => {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage - 1);
  };

  render() {
    const composeStyles = {
      marginLeft: '50px',
    };
    const divStyles = {
      float: 'left',
    };
    const {
      itemsPaged,
      itemsCurrentPage,
      itemsErrored,
      itemsLastPage,
      itemsRequested,
    } = this.props;
    if (itemsRequested)
      return (
        <div style={divStyles}>
          <Typography>Loading...</Typography>{' '}
        </div>
      );
    if (itemsErrored)
      return (
        <div>
          <Typography>Errored</Typography>{' '}
        </div>
      );
    return (
      <div style={composeStyles}>
        <h2>Inbox</h2>
        {itemsPaged.map((item, i) => <Mail item={item} key={i} />)}
        {itemsCurrentPage !== 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handlePrevious}
            className="button"
          >
            Previous
          </Button>
        )}
        {itemsCurrentPage !== itemsLastPage && (
          <Button
            style={composeStyles}
            variant="contained"
            color="secondary"
            onClick={this.handleNext}
            className="button"
          >
            Next
          </Button>
        )}
      </div>
    );
  }
}

export default Inbox;
