FROM node:16-alpine as react_build

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install packages
ADD ./package.json /tmp/package.json
ADD ./package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm ci
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

# Bundle source
ADD . /usr/src/app/

# make build
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=react_build ./usr/src/app/dist /usr/share/nginx/html
COPY  ./CI/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
