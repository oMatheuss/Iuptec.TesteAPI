# syntax=docker/dockerfile:1

FROM node:16

WORKDIR /iuptec.testeapi

COPY ["package.json", "package-lock.json*", "./"]
COPY build ./build

ENV NODE_ENV=production
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]