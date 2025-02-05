import { request } from '@umijs/max';

export type UserInfoReponse = {
  data: {
    username: string;
    avatar: string;
    college: string;
    contact: string;
    email: string;
    introduction: string;
    student_id: number;
    password: string;
    activities: Array<{
      id: number;
      title: string;
      description: string;
      start_time: string;
      end_time: string;
      created_at: string;
      updated_at: string;
      user_id: number;
      likes: number;
      views: number;
      collections: number;
      tags: string;
    }>;
    feedback: Array<{
      id: number;
      userId: number;
      title: string;
      content: string;
      status: string;
      reply: string;
      createdAt: string;
      updatedAt: string;
    }>;
    collectionCount: number;
    likesCount: number;
  };
};

export const getPersonalInfo = () => {
  return new Promise<UserInfoReponse>((resolve, reject) => {
    request('/user')
      .then((res) => {
        const data = res.data;
        // console.log('res', res);
        resolve({
          data,
        });
      })
      .catch(reject);
  });
};
