import { deleteObjectUnuseProperty } from '@/utils';
import { request } from '@umijs/max';
type Request = {
  /** 头像 */
  avatar: string | undefined;
  /** 邮箱 */
  email: string | undefined;
  /** 用户名 */
  username: string | undefined;
  /** 密码 */
  password: string | undefined;
  /** 自我介绍 */
  introduction: string | undefined;
};

export const updatePersonalInfo = (data: Request) => {
  return new Promise((resolve, reject) => {
    request('/user', {
      method: 'patch',
      data: deleteObjectUnuseProperty(data),
    })
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};
