FROM node:18-alpine
#скачування ноди, альпейн версія максимально обрізана
MAINTAINER some Dev
# імя розробника
RUN mkdir /app
# створити папку
WORKDIR /app
# основна  робоча папка

COPY ./backend/package.json /app
# копіюємо пакдж

RUN npm i --prodaction
# інсталювали пакети