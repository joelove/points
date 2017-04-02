import { fork } from 'redux-saga/effects';

import playersFlow from './players-saga';

export default function* sagas() {
  yield [
    fork(playersFlow),
  ];
}
