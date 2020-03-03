import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import { Background } from '~/components';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider() {
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadProviders() {
      const { data: response } = await api.get('/providers');

      setProviders(response);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }>
              <Avatar
                source={{
                  uri:
                    provider.avatar && provider.avatar.url
                      ? provider.avatar.url
                      : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}
