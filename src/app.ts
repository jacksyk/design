// 运行时配置
import 'animate.css';
import './global.css';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import type { RequestConfig } from 'umi';

import { RequestOptions } from '@umijs/max';
import { message, Modal } from 'antd';
import { startPerformanceMonitoring } from './performance';
// import VConsole from 'vconsole';

// new VConsole();
startPerformanceMonitoring();

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const request: RequestConfig = {
  errorConfig: {
    errorHandler(res: any) {
      if (res.response.status === 401) {
        localStorage.removeItem('token');

        Modal.confirm({
          title: '需要登录',
          content: '您需要登录后才能继续操作',
          okText: '去登录',
          cancelText: '回到首页',
          onOk: () => {
            window.location.href = '/login';
          },
          onCancel: () => {
            window.location.href = '/';
          },
        });
      }

      message.error(
        res.response.data.message ?? res.response.data.data.message,
      );
    },
    errorThrower() {},
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      // 从localStorage中获取token
      const token = localStorage.getItem('token');
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.shuyikang.online:3000';
      console.log(baseUrl, 'baseUrl');
      config.baseURL = baseUrl;
      // config.baseURL = 'http://localhost:3000';
      // 如果token存在，将其添加到请求头中
      if (token) {
        config.headers = {
          ...config.headers,
          token,
        };
      }
      return config;
    },
  ],
  responseInterceptors: [
    (response: any) => {
      console.log('response', response);
      return response;
    },
  ],
};
