FROM node:20.10.0-alpine

WORKDIR /code
RUN apk --no-cache add curl
COPY . .
RUN npm i -g pnpm typescript
RUN pnpm install --frozen-lockfile
RUN pnpm build

HEALTHCHECK CMD curl -f http://localhost:4000 || exit 1
CMD [ "node", "./dist/index.js" ]
