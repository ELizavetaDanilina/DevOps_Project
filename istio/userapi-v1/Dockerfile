# Dockerfile for userapi-v1
FROM node:16-alpine AS builder

WORKDIR /userapi

COPY ./userapi/package*.json ./

RUN npm install

COPY ./userapi/ ./

COPY ./istio/userapi-v1/index.js ./src/index.js 

EXPOSE 3000

CMD [ "npm", "start" ]


