import { request } from '@umijs/max';

interface CreateToolDto {
  title: string;
  description: string;
  link: string;
  tagIds: number[];
  type: 'link' | 'file';
}

export const uploadResourceTool = (data: CreateToolDto) => {
  return request<string>('/tool-library/tool', {
    method: 'POST',
    data,
  });
};
