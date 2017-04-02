import uuid from 'uuid';
import PlayerActionTypes from '../constants/player-action-types';

const initialState = [];

export function createPlayer(state, { name }) {
  return [...state, { id: uuid.v4(), name, points: 1000, played: 0 }];
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case PlayerActionTypes.CREATE_PLAYER:
      return createPlayer(state, payload);
    default:
      return state;
  }
}
