import { request } from '@umijs/max';
import dayjs from 'dayjs';
type Request = {
  activityId: number;
};

export type commentResponse = Array<{
  /** 评论id */
  id: number;
  /** 评论内容 */
  content: string;
  /** 创建时间 */
  createdTime: string;
  /** 用户名 */
  userName: string;
  /** 用户头像 */
  avatar: string;
}>;

export const getComments = (data: Request) =>
  new Promise<commentResponse>((resolve, reject) => {
    const { activityId } = data;
    request(`/comment/${activityId}`)
      .then((res) => {
        const mapData = res.data.map((item: any) => ({
          id: item.id,
          content: item.content,
          createdTime: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          userName: item.userId.username,
          avatar: item.userId.avatar,
        }));
        resolve(mapData);
      })
      .catch(reject);
  });
