FROM node
WORKDIR /app
COPY application/package.json /app
RUN npm install
COPY application/ .
COPY public/ ./public
EXPOSE 4200
CMD ["npm", "start"]
