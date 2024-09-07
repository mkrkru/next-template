FROM node:20.10.0-slim

WORKDIR /code
COPY . .
RUN npm i -g pnpm typescript && pnpm install --frozen-lockfile
RUN tsc

ENV NODE_ENV production
HEALTHCHECK CMD curl -f http://localhost:4000 || exit 1
CMD [ "node", "./dist/index.js" ]