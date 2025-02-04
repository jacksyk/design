import { request } from '@umijs/max';

type Request = {
  activityId: number;
  content: string;
};

export const sendCommentToServer = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/comment', {
      method: 'post',
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
