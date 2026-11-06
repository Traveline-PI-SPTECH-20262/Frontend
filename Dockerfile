
FROM node:24

WORKDIR /app

COPY application/package*.json ./
RUN npm install

COPY application/ .

RUN npm run build

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--configuration", "production"]
