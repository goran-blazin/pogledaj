# Base image
FROM node:16-slim as builder
ENV NODE_ENV build
RUN apt-get update && apt-get install -y openssl libssl-dev

# user node
USER node
WORKDIR /home/node

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm ci

COPY --chown=node:node . .

RUN npm run build \
    && npm prune --omit=dev

FROM node:16-slim as production
RUN apt-get update && apt-get install -y openssl libssl-dev

# Create app directory
ENV NODE_ENV production
ENV APP_LISTEN_PORT 8080

USER node
WORKDIR /home/node

# Copy packages
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]