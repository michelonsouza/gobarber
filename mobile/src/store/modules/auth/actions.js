import * as types from '~/store/types';

export function signInRequest(email, password) {
  return {
    type: types.SING_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: types.SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signUpSuccess() {
  return {
    type: types.SIGN_UP_SUCCESS,
  };
}

export function signFailure() {
  return {
    type: types.SIGN_FAILURE,
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}
