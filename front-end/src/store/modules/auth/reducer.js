import produce from 'immer';

import * as types from '~/store/types';

const initialState = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = initialState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_REQUEST:
      case types.SIGN_UP_REQUEST: {
        draft.loading = true;
        break;
      }

      case types.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case types.SIGN_FAILURE:
      case types.SIGN_UP_SUCCESS: {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
