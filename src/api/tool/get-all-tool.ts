import { request } from '@umijs/max';

export interface AllToolTypes {
  description: string;
  icon: string;
  id: number;
  link: string;
  tags: Tag[];
  title: string;
}

export interface Tag {
  id: number;
  name: string;
}

export const getAllTool = () => {
  return new Promise<Array<AllToolTypes>>((resolve, reject) => {
    request('/tool-library/tool/all')
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(reject);
  });
};
