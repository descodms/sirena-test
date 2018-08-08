import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

/* id: 1,
    firstName: 
    lastName: 
    email:
    message:
    subject: */

const styles = {
  height: '132.5px',
};
const cardContentStyles = {
  paddingTop: '8px',
};
const pStyles = {
  overflow: 'hidden',
};
//Presentational Component Mail
const Mail = ({ item }) => (
  <div>
    <Link
      style={{ textDecoration: 'none' }}
      to={`/view/${item.id || 'default'}`}
    >
      <List>
        <Card style={styles} key={item.id} className="item">
          <CardContent style={cardContentStyles}>
            <Typography>{item.email || ''}</Typography>
            <Typography>{item.subject || ''}</Typography>
            <Typography style={pStyles}>{item.message || ''}</Typography>
          </CardContent>
        </Card>
      </List>
    </Link>
  </div>
);
export default Mail;
