FROM oven/bun:1 AS base

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM base AS release
RUN mkdir .next
COPY --from=prerelease /home/bun/app/public ./public
COPY --from=prerelease /home/bun/app/.next/standalone ./
COPY --from=prerelease /home/bun/app/.next/static ./.next/static

HEALTHCHECK CMD curl -f http://localhost:3000 || exit 1

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

USER bun
CMD ["bun", "server.js"]
