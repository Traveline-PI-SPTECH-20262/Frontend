FROM node:24 AS build
WORKDIR /app
COPY application/package*.json ./
RUN npm install
COPY application/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/application/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
