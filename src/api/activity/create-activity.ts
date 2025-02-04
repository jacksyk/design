import { request } from '@umijs/max';

type Request = {
  title: string;
  description: string;
  start_time: number;
  end_time: number;
};

export const createActivity = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/activity', {
      method: 'post',
      data,
    })
      .then(resolve)
      .catch(reject);
  });
};
