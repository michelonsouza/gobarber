import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { NotificationList, Scroll, Notification } from './styles';

function NotificationListComponent({
  visible,
  notifications,
  handleMarkAsRead,
}) {
  return (
    <NotificationList visible={visible}>
      <Scroll>
        {notifications.map(notification => (
          <Notification unread={!notification.read} key={notification._id}>
            <p>{notification.content}</p>
            <time>{notification.timeDistance}</time>
            {!notification.read && (
              <button
                type="button"
                onClick={() => handleMarkAsRead(notification._id)}
              >
                Marcar como lida
              </button>
            )}
          </Notification>
        ))}
      </Scroll>
    </NotificationList>
  );
}

NotificationListComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleMarkAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      read: PropTypes.bool,
      _id: PropTypes.string,
      content: PropTypes.string,
      timeDistance: PropTypes.string,
    })
  ).isRequired,
};

export default memo(NotificationListComponent);
