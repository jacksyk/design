import { request } from '@umijs/max';

type Request = {
  to: string;
};

export const sendEmail = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/email', {
      method: 'POST',
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
