import { request } from '@umijs/max';

type Request = {
  file: File;
};

type Response = string;

export const uploadFile = (data: Request) => {
  return new Promise<Response>((resolve, reject) => {
    request('/upload', {
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        resolve(res.data.url);
      })
      .catch(reject);
  });
};
