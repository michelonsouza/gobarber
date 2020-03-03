import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import { Background, DateInput } from '~/components';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const route = useRoute();
  const { navigate } = useNavigation();
  const { provider } = route.params;

  useEffect(() => {
    async function loadAvailable() {
      const { data: response } = await api.get(
        `/providers/${provider.id}/available`,
        {
          params: {
            date: date.getTime(),
          },
        }
      );

      setHours(response);
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              enabled={item.available}
              onPress={() => handleSelectHour(item.value)}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
