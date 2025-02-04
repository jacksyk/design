import { request } from '@umijs/max';

type Request = {
  activityId: number;
};

export const addViews = (data: Request) =>
  new Promise((resolve, reject) => {
    request(`/user/views/${data.activityId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
