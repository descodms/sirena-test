import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppConnect from './components/AppConnect';
import { BrowserRouter, Route } from 'react-router-dom';
import 'typeface-roboto';

// the parent component is Provider with the Redux Store
const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={AppConnect} />
    </BrowserRouter>
  </Provider>
);

render(router, document.getElementById('root'));
