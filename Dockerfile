# docker build -t dotcom-components:latest .
# docker run --init --rm -p 3030:3030 dotcom-components:latest

FROM node:12-alpine

RUN apk add yarn

WORKDIR /usr/src/app

# Copy+install deps first to take advantage of layer caching
COPY package.json ./
COPY yarn.lock ./
RUN yarn --immutable install

# Then install rest of code (which likely changes more frequently)
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV NODE_ENV=production
RUN yarn build
COPY src/schemas dist/schemas

EXPOSE 3030
ENTRYPOINT [ "node", "dist/server.js" ]
