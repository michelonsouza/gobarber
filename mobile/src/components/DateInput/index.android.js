import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import PropTypes from 'prop-types';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(() => {
    setOpened(false);
    return format(date, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }, [date]);

  function dateChange(event, selectedDate) {
    onChange(selectedDate || date);

    if (!event.timestamps) {
      setOpened(false);
    }
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" sie={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DateTimePicker
          value={date}
          display="spinner"
          onChange={dateChange}
          minimumDate={new Date()}
          minuteInterval={60}
          locale="pt"
          mode="date"
        />
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
