import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as types from '~/store/types';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const { data: response } = yield call(api.put, '/users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response));
  } catch (error) {
    yield put(updateProfileFailure());
    Alert.alert('Error', 'Erro ao atualizar perfil, verifique seus dados');
  }
}

export default all([takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile)]);
