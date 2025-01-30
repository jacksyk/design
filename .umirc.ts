import { defineConfig } from '@umijs/max';
import path from 'path';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'pnpm',
  plugins: [path.resolve(__dirname, './plugin/auto-generate-plugin.js')],
});

