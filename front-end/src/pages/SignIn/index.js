import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import Spinner from 'react-spinner-material';
import * as Yup from 'yup';

import logo from '~/assets/images/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required(),
    password: Yup.string().required('A senha é obrigatória'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <Spinner size={24} spinnerColor="#fff" spinnerWidth={3} />
          ) : (
            'Acessar'
          )}
        </button>
        <Link to="/register">Crie conta gratuita</Link>
      </Form>
    </>
  );
}
