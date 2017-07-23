FROM node:alpine

LABEL Description="This application allows to write and read a public SSH key"
LABEL maintainer="hylke.stapersma@gmail.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]