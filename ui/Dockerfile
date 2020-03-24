FROM node:12.14.0 as build
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./public ./public/
COPY ./src ./src/
COPY ./.env.production.local

RUN npm run build

FROM nginx:1.17-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
