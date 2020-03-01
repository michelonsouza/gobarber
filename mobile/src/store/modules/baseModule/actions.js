import * as types from '~/store/types';

export function base(data) {
  return { type: types.BASE, payload: { data } };
}
