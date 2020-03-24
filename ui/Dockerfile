FROM node:12.14.0 as build

ARG SERVER_URL
ARG GOOGLE_API_KEY

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./public ./public/
COPY ./src ./src/

RUN REACT_APP_SERVER_URL=${SERVER_URL} REACT_APP_GOOGLE_API_KEY=${GOOGLE_API_KEY} npm run build

FROM nginx:1.17-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
