import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import reducers from './reducers';
import sagas from './sagas';

export function createStoreWithHistory(history) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    connectRouter(history)(
      combineReducers(reducers)
    ),
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
      ),
    ),
  )

  sagaMiddleware.run(sagas);

  return store;
}
