FROM node:8.6.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/src/apiaddicts-api && cp -a /tmp/node_modules /usr/local/src/apiaddicts-api

WORKDIR /usr/local/src/apiaddicts-api
ADD . /usr/local/src/apiaddicts-api

CMD ["npm", "run", "dev"]
