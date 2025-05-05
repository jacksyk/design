import { request } from '@umijs/max';

type BodyType = {
  newPassword: string;
  verifyCode: string;
  studentId: string;
};

export const updatePassword = (body: BodyType) => {
  return new Promise((resolve, reject) => {
    request('/user/password', {
      method: 'POST',
      data: body,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
