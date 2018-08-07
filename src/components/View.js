import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class View extends Component {
  render() {
    const styles = {
      marginLeft: '40px',
      marginTop: '22px',
    };
    const props = this.props.props;
    let mailId = parseInt(this.props.params.mailId, 10);
    let i = props.itemsPaged.findIndex(item => item.id === mailId);
    let item = props.itemsPaged[i] || [];
    if (item.length === 0) {
      i = props.sentItems.sent.findIndex(item => item.id === mailId);
      item = props.sentItems.sent[i] || [];
      if (item.length === 0) {
        i = props.draftItems.draft.findIndex(item => item.id === mailId);
        item = props.draftItems.draft[i] || [];
        if (item.length === 0) {
          item = undefined;
        }
      }
    }

    return (
      <Card style={styles} className="item">
        <CardContent>
          <Typography>{`${item.firstName} - ${item.lastName}`}</Typography>
          <Typography>{item.email}</Typography>
          <Typography>{item.subject}</Typography>
          <Typography>{item.message}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default View;
