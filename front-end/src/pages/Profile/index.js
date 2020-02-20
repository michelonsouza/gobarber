import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import Spinner from 'react-spinner-material';

import { updateProfilerequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const { profile, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfilerequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" type="text" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <Spinner size={20} spinnerColor="#fff" spinnerWidth={3} />
          ) : (
            'Atualizar Perfil'
          )}
        </button>
      </Form>

      <button type="button" disabled={loading} onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
