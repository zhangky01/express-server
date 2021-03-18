# DOC FROM https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# 建议上面内容打包成基础镜像
# 在依赖包没有更新的情况下，不需要重新构建。

COPY . .

EXPOSE 8080

CMD ["npm", "run", "server"]