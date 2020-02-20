import * as types from '~/store/types';

export function updateProfilerequest(data) {
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
  };
}
