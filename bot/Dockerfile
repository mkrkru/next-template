FROM node:20.10.0-alpine

WORKDIR /deps
RUN apk --no-cache add curl
COPY . .
RUN npm i -g pnpm typescript && pnpm install --frozen-lockfile
RUN tsc

ENV NODE_ENV production
CMD [ "node", "./dist/index.js" ]
