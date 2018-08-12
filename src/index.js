import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppConnect from './components/AppConnect';
import { BrowserRouter, Route } from 'react-router-dom';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';

// Add this import:
import { AppContainer } from 'react-hot-loader';

// the parent component is Provider with the Redux Store
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={AppConnect} />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

// Do this once
registerServiceWorker();

render(AppConnect);
// render(router, document.getElementById('root'));

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/AppConnect', () => {
    render(AppConnect);
  });
}
