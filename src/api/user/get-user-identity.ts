import { request } from '@umijs/max';

export const getUserIdentity = () => {
  return new Promise((resolve, reject) => {
    request('/user/identity', {
      method: 'GET',
    })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
