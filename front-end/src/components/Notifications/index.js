import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';

import NotificationList from './NotificationList';

import { Container, Badge } from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(() => {
    return !!notifications.find(notification => !notification.read);
  }, [notifications]);

  useEffect(() => {
    async function loadNotifications() {
      const { data: response } = await api.get('/notifications');

      const data = response.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`/notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={handleToggleVisible}>
        <MdNotifications color="#7159c1" size={30} />
      </Badge>

      <NotificationList
        visible={visible}
        notifications={notifications}
        handleMarkAsRead={handleMarkAsRead}
      />
    </Container>
  );
}
