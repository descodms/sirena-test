import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Inbox from './Inbox';
import Draft from './Draft';
import Sent from './Sent';
import View from './View';
import Compose from './Compose';
import { Button } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SentIcon from '@material-ui/icons/Send';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class Navigation extends React.Component {
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
      <div>
        <div style={divNav}>
          <h2 style={styleHeader}>Menu</h2>

          <List component="nav">
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
            <Link
              style={{ textDecoration: 'none' }}
              type="button"
              to="/compose"
            >
              <Button
                style={composeStyles}
                variant="contained"
                color="secondary"
              >
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
          </List>
        </div>
        <div style={divContent}>
          <Route path="/inbox" render={props => <Inbox {...this.props} />} />
          <Route
            path="/view/:mailId"
            render={({ match, props }) => (
              <Compose props={this.props} params={match.params} />
            )}
          />
          <Route
            path="/compose"
            render={props => <Compose {...this.props} />}
          />
          <Route path="/draft" render={props => <Draft {...this.props} />} />
          <Route path="/sent" render={props => <Sent {...this.props} />} />
        </div>
      </div>
    );
  }
}

export default Navigation;
