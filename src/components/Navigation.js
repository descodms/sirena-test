import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import Inbox from './Inbox';
import Draft from './Draft';
import Sent from './Sent';
import Compose from './Compose';
import Search from './Search';
import { Button } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SentIcon from '@material-ui/icons/Send';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Fragment } from 'react';
import SearchBox from './SearchBox';
import { Switch } from 'react-router-dom';
class Navigation extends React.Component {
  handleClick = e => {
    this.props.removeSearchResults(this.props.results);
  };
  render() {
    const divNav = {
      width: '150px',
      float: 'left',
    };
    const styleHeader = {
      marginLeft: '50px',
    };
    const composeStyles = {
      marginLeft: '45px',
      marginBottom: '20px',
    };
    const divContent = { width: '500px', float: 'left', marginBottom: '40px' };
    return (
      <Fragment>
        <div style={divNav} onClick={this.handleClick}>
          <Link style={{ textDecoration: 'none' }} to="/inbox">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/draft">
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/sent">
            <ListItem button>
              <ListItemIcon>
                <SentIcon />
              </ListItemIcon>
              <ListItemText primary="Sent" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} type="button" to="/compose">
            <Button style={composeStyles} variant="contained" color="secondary">
              Compose
            </Button>
          </Link>
          <Button
            style={styleHeader}
            onClick={this.props.logout}
            variant="outlined"
            color="secondary"
          >
            Logout
          </Button>
        </div>
        <div style={divContent}>
          <SearchBox {...this.props} />
          <Redirect from="/" to="/inbox" />
          <Switch>
            <Route
              path="/search"
              render={props => <Search {...this.props} />}
            />
            <Route path="/inbox" render={props => <Inbox {...this.props} />} />
            <Route
              path="/view/:mailId"
              render={({ match }) => (
                <Compose props={this.props} params={match.params} />
              )}
            />
            <Route
              path="/compose"
              render={({ match }) => (
                <Compose props={this.props} params={match.params} />
              )}
            />
            <Route path="/draft" render={props => <Draft {...this.props} />} />
            <Route path="/sent" render={props => <Sent {...this.props} />} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default Navigation;
