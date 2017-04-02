import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = applyMiddleware(
  sagaMiddleware,
)(createStore)(combineReducers({
  ...reducers,
}));

sagaMiddleware.run(sagas);

export default store;
