import { request } from '@@/plugin-request';
import { reject } from 'lodash-es';
type LoginType = {
  student_id: string;
  password: string;
};

type ResponseType = {
  token: string;
  message: string;
};

export const login = (data: LoginType) => {
  return new Promise<ResponseType>((resolve) => {
    request('/login', {
      method: 'post',
      data,
    })
      .then((res) => {
        const { token, message } = res.data;
        resolve({
          token,
          message,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
