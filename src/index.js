import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppConnect from './components/AppConnect';
import Inbox from './components/Inbox';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'typeface-roboto';

// the parent component is Provider with the Redux Store
const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={AppConnect} />
        {/* <Route exact path="/" component={Inbox} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(router, document.getElementById('root'));
