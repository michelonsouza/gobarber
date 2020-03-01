import { produce } from 'immer';

import * as types from '~/store/types';

const initalState = {
  base: false,
};

export function module(state = initalState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.BASE: {
        draft.base = true;
        break;
      }
      default:
    }
  });
}
