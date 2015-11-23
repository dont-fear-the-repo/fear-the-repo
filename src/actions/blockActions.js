import { MOVE_BLOCK } from 'constants/blockConstants';

export function moveBlock (payload) {
  return {
    type: MOVE_BLOCK,
    payload: payload
  };
}
