import { produce } from 'immer';

import * as types from '~/store/types';

const initalState = {
  profile: null,
  loading: false,
};

export default function module(state = initalState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }

      case types.SIGN_UP_SUCCESS: {
        draft.user = action.payload.user;
        break;
      }

      case types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }

      case types.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }

      case types.SIGN_OUT: {
        draft.profile = null;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
