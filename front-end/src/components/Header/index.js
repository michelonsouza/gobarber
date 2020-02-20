import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Notifications from '../Notifications';

import logo from '~/assets/images/logo-purple.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const { profile } = useSelector(state => state.user);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Michelon Souza"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
