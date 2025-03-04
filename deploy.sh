#!/bin/bash

# 配置信息
SERVER_IP="47.122.119.171"
SERVER_USER="root"
PROJECT_NAME="web-graduate"
REMOTE_DIR="/www/wwwroot/web"  # 服务器上的部署目录

# 颜色输出
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}开始部署...${NC}"

# 1. 清除远程目录
echo -e "${GREEN}1. 清除远程目录...${NC}"
ssh $SERVER_USER@$SERVER_IP "rm -rf $REMOTE_DIR/*"

# 2. 本地打包
echo -e "${GREEN}2. 开始打包项目...${NC}"
npm run build

# 3. 传输文件到服务器
echo -e "${GREEN}3. 传输文件到服务器...${NC}"
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"
scp -r dist ssl docker-compose.yml nginx.conf Dockerfile $SERVER_USER@$SERVER_IP:$REMOTE_DIR

# 4. 在服务器上部署
echo -e "${GREEN}4. 在服务器上部署...${NC}"
ssh $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && docker-compose up --build -d"

echo -e "${GREEN}部署完成！${NC}"