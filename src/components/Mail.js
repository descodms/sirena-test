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

//Presentational Component Mail
const Mail = ({ item }) => (
  <div>
    <List>
      <Card key={item.id} className="item">
        <CardContent>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/view/${item.id || 'default'}`}
          >
            <Typography>{item.email || ''}</Typography>
            <Typography>{item.subject || ''}</Typography>
            <Typography>{item.message || ''}</Typography>
          </Link>
        </CardContent>
      </Card>
    </List>
  </div>
);
export default Mail;
