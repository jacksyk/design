# 生产阶段
FROM nginx:alpine

# 在容器内创建存放SSL证书的目录
RUN mkdir -p /www/wwwroot/ssl/

# 将本地SSL证书文件复制到容器内
COPY ssl/shuyikang.online.pem /www/wwwroot/ssl/
COPY ssl/shuyikang.online.key /www/wwwroot/ssl/

# 复制项目构建文件到Nginx默认的网站目录
COPY dist /usr/share/nginx/html

# 复制Nginx配置文件到Nginx的配置目录
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 声明容器将要监听的端口
EXPOSE 80
EXPOSE 443