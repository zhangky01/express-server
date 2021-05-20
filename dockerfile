# DOC FROM https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .

# 设置淘宝源
RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

# 建议上面内容打包成基础镜像
# 在依赖包没有更新的情况下，不需要重新构建。

COPY . .

# 生成API文档
RUN npm run apidoc

# 增加构建前测试
RUN npm run test

# docker logs 展示容器内日志文件
RUN ln -sf /dev/stdout ./logs/seal-generator.log

EXPOSE 8080

CMD ["npm", "run", "server"]