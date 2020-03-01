import React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  // eslint-disable-next-line no-unused-expressions
  navigationRef.current && navigationRef.navigate(name, params);
}
