import { request } from '@umijs/max';

export const translateJson = (data: any) => {
  return new Promise<any>((resolve, reject) => {
    request('/translate', {
      method: 'post',
      data,
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(reject);
  });
};
