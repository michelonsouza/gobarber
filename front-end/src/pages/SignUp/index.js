import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Spinner from 'react-spinner-material';

import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/images/logo.svg';

export default function SignUp() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required(),
    password: Yup.string()
      .min(6, 'No mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">
          {loading ? (
            <Spinner size={24} spinnerColor="#fff" spinnerWidth={3} />
          ) : (
            'Criar conta'
          )}
        </button>
        <Link to="/">Já possuo uma conta</Link>
      </Form>
    </>
  );
}
