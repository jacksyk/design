import { request } from '@umijs/max';

type Request = {};

export const getPersonalInfo = () => {
  return new Promise((resolve, reject) => {
    request('/')
      .then((res) => {})
      .catch(reject);
  });
};
