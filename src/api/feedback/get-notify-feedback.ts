import { request } from '@umijs/max';
import dayjs from 'dayjs';

export type getNotifyFeedbackResponse = {
  /** 通知的数据 */
  data: Array<{
    id: number;
    /** 标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 状态 */
    status: 'pending' | 'resolved' | 'readed';
    /** 回复内容 */
    reply: string;
    /** 创建时间 */
    createTime: string;
  }>;

  /** 通知总数 */
  count: number;
};

export const getNotifyFeedback = () => {
  return new Promise<getNotifyFeedbackResponse>((resolve, reject) => {
    request('/feedback/reply')
      .then((res) => {
        const data = res.data.data.map((item: any) => {
          return {
            ...item,
            createTime: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          };
        });

        resolve({
          data: data as getNotifyFeedbackResponse['data'],
          count: res.data.totalCount,
        });
      })
      .catch(reject);
  });
};
