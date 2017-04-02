import { push } from 'connected-react-router';
import { take, put, fork } from 'redux-saga/effects';

import { RouteConfig } from '../config';
import { PlayerActionTypes } from '../constants';
import { PlayerActions } from '../actions';

const { createPlayer } = PlayerActions;

export function* addPlayer({ name }) {
  yield put(createPlayer(name));
  yield put(push(RouteConfig.SCORES));
}

export default function* playersFlow() {
  while (true) {
    const { type, payload } = yield take([
      PlayerActionTypes.ADD_PLAYER,
    ]);

    switch (type) {
      case PlayerActionTypes.ADD_PLAYER:
        yield fork(addPlayer, payload);
        break;
    }
  }
}
