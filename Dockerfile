# 生产阶段
FROM nginx:alpine

# 创建对应的目录
RUN mkdir -p /www/wwwroot/ssl/
# 复制证书文件到容器内的相同路径
COPY ssl/shuyikang.online.pem /www/wwwroot/ssl/
COPY ssl/shuyikang.online.key /www/wwwroot/ssl/
# 复制本地构建的文件
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80