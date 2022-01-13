FROM node:14 AS build
WORKDIR /app
COPY package* package-lock.json ./
RUN npm install
COPY docs ./docs
RUN npm run docs:build

FROM nginx:alpine
COPY --from=build /app/docs/.vuepress/dist /usr/share/nginx/html
