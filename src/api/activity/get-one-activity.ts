import { request } from '@umijs/max';
import dayjs from 'dayjs';
type Request = {
  /** 活动id */
  activityId: number;
};

export type getOneActivityResponse = {
  data: {
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
    /** 用户对当前文章的点赞状态 */
    isLiked: boolean;
    /** 用户对当前文章的收藏状态 */
    isCollected: boolean;
    /** tags */
    tags?: string;
  };
};

export const getOneActivity = (data: Request) =>
  new Promise<getOneActivityResponse>((resolve, reject) => {
    request(`/activity/${data.activityId}`)
      .then((res) => {
        const item = res.data;

        console.log('item', item);
        const returnData = {
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
          isLiked: item.isLiked,
          isCollected: item.isCollected,
          tags: item.tags,
        };

        resolve({
          data: returnData,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
