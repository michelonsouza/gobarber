import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as types from '~/store/types';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const { data: response } = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response;

    if (!user.provider) {
      toast.error('Usuário não é prestador');
      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (error) {
    toast.error('E-mail ou senha inválidos');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    yield put(signUpSuccess());
    history.push('/');
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest(types.SIGN_UP_REQUEST, signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
