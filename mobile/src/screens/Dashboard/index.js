import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';

import api from '~/services/api';
import { Background, Appointment } from '~/components';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAppointments() {
      const { data: response } = await api.get('/appointments');

      setAppointments(response);
    }

    loadAppointments();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      const { data: response } = await api.delete(`/appointments/${id}`);

      setAppointments(
        appointments.map(appointment =>
          appointment.id === id
            ? {
                ...appointment,
                canceled_at: response.canceled_at,
              }
            : appointment
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Erro ao cancelar agendamento');
    }
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
