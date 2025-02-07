import { request } from '@umijs/max';

type Request = {
  student_id: string;
  password: string;
  email: string;
  code: string;
};

export const createUser = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/user', {
      method: 'POST',
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
