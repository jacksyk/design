# 构建阶段
FROM node:20.11.0 as builder

WORKDIR /app

COPY package*.json ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

COPY . .

RUN pnpm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80