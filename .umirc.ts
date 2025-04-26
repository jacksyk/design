import { defineConfig } from '@umijs/max';
import path from 'path';
console.log(process.env.NODE_ENV, '>>>');

export default defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  npmClient: 'pnpm',
  plugins: [path.resolve(__dirname, './plugin/auto-generate-plugin.js')],
  tailwindcss: {},
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  clickToComponent: {
    editor: 'cursor',
  },
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
});
