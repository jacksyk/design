import { request } from '@umijs/max';
import dayjs from 'dayjs';
import { getNotifyFeedbackResponse } from './get-notify-feedback';

type Response = {
  data: getNotifyFeedbackResponse['data'];
};

export const getPersonFeedback = () => {
  return new Promise<Response>((resolve, reject) => {
    request('/feedback/person')
      .then((res) => {
        const data = res.data.map((item: any) => {
          return {
            ...item,
            createTime: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          };
        });

        resolve({
          data,
        });
      })
      .catch(reject);
  });
};
