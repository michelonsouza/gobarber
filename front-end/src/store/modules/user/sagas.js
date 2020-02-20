import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response));
  } catch (error) {
    toast.success('Erro ao atualizar perfil, confira seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile)]);
