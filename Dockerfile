FROM node:14.17.0 AS base
RUN apt-get update \
    &&  apt-get install -y tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && mkdir -p /app \
    && apt-get install -y  git
WORKDIR /app
COPY package.json /app/package.json
RUN yarn 
COPY . /app
RUN npm install pm2 -g --silent
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
