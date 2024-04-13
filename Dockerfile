FROM node:20-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY --chown=node:node package*.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY --chown=node:node . .
COPY --chown=node:node src/prisma/schema.prisma ./src/prisma/schema.prisma

RUN npx prisma generate
RUN yarn build

# ---

FROM node:20-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/yarn.lock ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["yarn", "start:prod"]