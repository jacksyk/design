import { request } from '@umijs/max';
import dayjs from 'dayjs';

type getAllActivityResponse = {
  data: Array<{
    /** 活动id */
    id: number;
    /** 活动标题 */
    title: string;
    /** 活动描述 */
    description: string;
    /** 活动内容 */
    content: string;
    /** 创建时间 */
    createTime: string;
    /** 用户id */
    userId: number;
    /** 活动点赞数 */
    likes: number;
    /** 活动查看数 */
    views: number;
    /** 活动收藏数 */
    collections: number;
    /** 用户名称 */
    username: string;
    /** 用户头像 */
    avatar: string;
  }>;
  totalCount: 3;
};

export const getAllCampus = () =>
  new Promise<getAllActivityResponse>((resolve, reject) => {
    request(`/activity/campus/all`)
      .then((res) => {
        const { data, totalCount } = res.data;
        const returnData = data.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            content: item.content,
            createTime: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
            likes: item.likes,
            views: item.views,
            collections: item.collections,
            username: item.user.username,
            avatar: item.user.avatar,
            userId: item.user.id,
          };
        });
        resolve({
          data: returnData,
          totalCount,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
