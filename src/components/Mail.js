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
  height: '131px',
};
const cardContentStyles = {
  paddingTop: '2px',
};
const pStyles = {
  overflow: 'hidden',
};
const subjectStyles = {
  fontSize: '1.1rem',
  fontWeight: '500',
};
const nameStyles = {
  fontStyle: 'italic',
  fontWeight: '500',
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
            <Typography style={subjectStyles}>{item.subject || ' '}</Typography>
            <Typography style={nameStyles}>
              {item.firstName || ' '} {item.lastName || ' '}
            </Typography>
            <Typography style={pStyles}>{item.message || ' '}</Typography>
          </CardContent>
        </Card>
      </List>
    </Link>
  </div>
);
export default Mail;
