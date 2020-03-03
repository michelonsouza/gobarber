import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { formatRelative, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';
import { Background } from '~/components';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm() {
  const [loading, setLoading] = useState();
  const route = useRoute();
  const { navigate } = useNavigation();
  const { provider, time } = route.params;

  const dateFormatted = useMemo(() => {
    return formatRelative(parseISO(time), new Date(), {
      locale: pt,
    });
  }, [time]);

  async function handleAddAppointment() {
    try {
      setLoading(true);

      await api.post('/appointments', {
        provider_id: provider.id,
        date: time,
      });

      setLoading(false);
      Alert.alert('Sucesso', 'Agendamento criado com sucesso');
      navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Erro ao criar um novo agendamento');
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri:
              provider.avatar && provider.avatar.url
                ? provider.avatar.url
                : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment} loading={loading}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
