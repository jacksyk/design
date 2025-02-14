import { request } from '@umijs/max';

import { Tag } from './get-all-tool';

export const getAllTags = () => {
  return new Promise<Tag[]>((resolve, reject) => {
    request('/tool-library/tag/all')
      .then((res) => {
        console.log('res.data', res.data);
        resolve(res.data);
      })
      .catch(reject);
  });
};
