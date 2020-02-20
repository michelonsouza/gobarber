import produce from 'immer';

import * as types from '~/store/types';

const initialState = {
  profile: null,
  loading: false,
};

export default function user(state = initialState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
