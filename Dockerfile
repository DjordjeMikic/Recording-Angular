FROM node:latest as node

WORKDIR /app

COPY . .
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=node /app/dist/recording /usr/share/nginx/html