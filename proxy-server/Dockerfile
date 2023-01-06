FROM node:19-alpine3.16
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT [ "node", "index.js" ]