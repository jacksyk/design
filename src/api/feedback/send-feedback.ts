import { request } from '@umijs/max';

type Request = {
  title: string;
  content: string;
};

export const sendFeedBack = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/feedback', {
      method: 'post',
      data,
    })
      .then(resolve)
      .catch(reject);
  });
};
