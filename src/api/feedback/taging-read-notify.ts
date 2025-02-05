import { request } from '@umijs/max';

type Request = {
  /** 反馈id */
  feedbackId: number;
};

export const taggingReadNotify = (data: Request) => {
  return new Promise((resolve, reject) => {
    request(`/feedback/read/${data.feedbackId}`)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
