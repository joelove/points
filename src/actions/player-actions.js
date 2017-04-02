import PlayerActionTypes from '../constants/player-action-types';

function addPlayer(name) {
  return {
    type: PlayerActionTypes.ADD_PLAYER,
    payload: { name },
  };
}

function createPlayer(name) {
  return {
    type: PlayerActionTypes.CREATE_PLAYER,
    payload: { name },
  };
}

export default {
  addPlayer,
  createPlayer,
};
