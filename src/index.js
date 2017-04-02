import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import { createStoreWithHistory } from './store';
import { ScoresContainer, AddPlayerContainer } from './containers';

import './assets/scss/index.scss';

const history = createBrowserHistory();
const store = createStoreWithHistory(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history} location={window.location}>
      <div>
        <Route exact path="/" component={ScoresContainer} />
        <Route path="/scores" component={ScoresContainer} />
        <Route path="/add-player" component={AddPlayerContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
