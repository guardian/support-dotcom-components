# docker build -t contributions-service:latest .
# docker run --init --rm -p 3030:3030 contributions-service:latest

FROM node:12-alpine

RUN apk add yarn

WORKDIR /usr/src/app

ARG NODE_ENV=production

# Copy+install deps first to take advantage of layer caching
COPY package.json ./
COPY yarn.lock ./
RUN yarn --immutable install

# Then install rest of code (which likely changes more frequently)
COPY . .
RUN yarn build

EXPOSE 3030
ENTRYPOINT [ "node", "dist/server.js" ]
