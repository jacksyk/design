// 运行时配置
import 'animate.css';
import './global.css';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import type { RequestConfig } from 'umi';

import { RequestOptions } from '@umijs/max';
import VConsole from 'vconsole';

new VConsole();

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      // 从localStorage中获取token
      const token = localStorage.getItem('token');

      config.baseURL = 'http://47.122.119.171:3000';
      // 如果token存在，将其添加到请求头中
      if (token) {
        config.headers = {
          ...config.headers,
          token,
        };
      }
      console.log('config', config);
      return config;
    },
  ],
  responseInterceptors: [],
};
