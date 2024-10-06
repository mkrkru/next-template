FROM node:20.10.0-alpine

WORKDIR /deps
RUN apk --no-cache add curl
COPY ../backend .
RUN npm i -g pnpm typescript && pnpm install --frozen-lockfile
RUN tsc

ENV NODE_ENV production
HEALTHCHECK CMD curl -f http://localhost:4000 || exit 1
CMD [ "node", "./dist/index.js" ]
