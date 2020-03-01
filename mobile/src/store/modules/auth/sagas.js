import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as types from '~/store/types';
import api from '~/services/api';
import { navigate } from '~/services/navigation';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    console.tron.log('payload:', payload);

    const { data: response } = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response;

    if (user.provider) {
      Alert.alert('Error', 'Este usuário não pode acessar esta plataforma');
      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    // navigate('Dashboard');
  } catch (error) {
    yield put(signFailure());
    Alert.alert('Error', 'E-mail ou senha inválidos');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    yield put(signUpSuccess());
    navigate('SignIn');
  } catch (error) {
    yield put(signFailure());
    Alert.alert('Error', 'Falha no cadastro, verifique seus dados');
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

export function signOut() {
  navigate('SingIn');
}

export default all([
  takeLatest(types.SING_IN_REQUEST, signIn),
  takeLatest(types.SIGN_UP_REQUEST, signUp),
  takeLatest(types.SIGN_OUT, signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
