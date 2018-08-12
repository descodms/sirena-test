import React, { Component } from 'react';
import Mail from './Mail';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { inbox } from '../apis/inbox';

//Container Component Inbox
class Inbox extends Component {
  state = {
    instance: 'inbox',
  };

  componentDidMount = () => {
    this.setState({ instance: this.props.params.instance });
    this.fetchInstance(this.props.params.instace);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.params.instance !== this.props.params.instance) {
      this.setState({ instance: this.props.params.instance });
      this.fetchInstance(this.props.params.instace);
    }
  };

  fetchInstance = instance => {
    if (this.props.params.instance === 'inbox') {
      this.items = inbox;
    }
    if (this.props.params.instance === 'draft') {
      this.items = this.props.props.draftItems;
    }
    if (this.props.params.instance === 'sent') {
      this.items = this.props.props.sentItems;
    }
    if (this.props.params.instance === 'results') {
      this.items = this.props.props.results;
    }

    const { fetchItems, itemsCurrentPage } = this.props.props;
    fetchItems(0, this.items);
  };

  handleNext = () => {
    const { fetchItems, itemsCurrentPage } = this.props.props;
    fetchItems(itemsCurrentPage + 1, this.items);
  };

  handlePrevious = () => {
    const { fetchItems, itemsCurrentPage } = this.props.props;
    fetchItems(itemsCurrentPage - 1, this.items);
  };

  render() {
    const composeStyles = {
      marginLeft: '50px',
      float: 'left',
      width: '500px',
    };
    const divStyles = {
      float: 'left',
      marginLeft: '50px',
      marginTop: '10px',
    };
    const nextStyles = {
      float: 'right',
    };
    const textCap = {
      textTransform: 'capitalize',
    };
    const {
      itemsPaged,
      itemsCurrentPage,
      itemsErrored,
      itemsLastPage,
      itemsRequested,
    } = this.props.props;
    if (itemsRequested)
      return (
        <div style={divStyles}>
          <Typography>Loading...</Typography>{' '}
        </div>
      );
    if (itemsErrored)
      return (
        <div style={divStyles}>
          <Typography>Errored</Typography>{' '}
        </div>
      );
    if (!itemsPaged.length) {
      return (
        <div style={divStyles}>
          <h2 style={textCap}>{this.state.instance}</h2>
          <Typography>No hay mensajes</Typography>{' '}
        </div>
      );
    }
    return (
      <div style={composeStyles}>
        <h2 style={textCap}>{this.state.instance}</h2>
        {itemsPaged.map((item, i) => (
          <Mail item={item} key={i} index={i} instance={this.state.instance} />
        ))}
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
            style={nextStyles}
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
