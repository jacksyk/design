import { request } from '@umijs/max';

type Request = {
  title: string;
  description: string;
  tags: string;
  start_time: number;
  end_time: number;
  content: string;
  type: string;
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
