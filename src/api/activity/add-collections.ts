import { request } from '@umijs/max';

type Request = {
  activityId: number;
};

type Response = {
  data: { data: '0' | '1'; message: string };
};

export const addCollections = (data: Request) =>
  new Promise<Response>((resolve, reject) => {
    request(`/user/collections/${data.activityId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
