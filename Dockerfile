FROM node:8.6.0

RUN npm install -g nodemon

# Use cached layer for node modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/src/apiaddicts-api && cp -a /tmp/node_modules /usr/local/src/apiaddicts-api

# Add project files
WORKDIR /usr/local/src/apiaddicts-api
ADD . /usr/local/src/apiaddicts-api

EXPOSE 3000

CMD ["npm", "run", "dev"]
