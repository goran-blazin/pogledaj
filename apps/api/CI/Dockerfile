FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install packages
ADD ../package.json /tmp/package.json
ADD ../package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm ci
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

# Bundle source
ADD ../. /usr/src/app/