import "./ws";
import { logger } from "../misc";
import Fastify from "fastify";

const fastify = Fastify({ logger });

fastify.get("/", () => ({ message: "OK" }));

export const jwt_secret = process.env?.JWT_SECRET ?? "tempsecret";

(async () => {
  try {
    fastify.decorateRequest("user");
    await fastify.register(import("@fastify/rate-limit"), {
      max: 100,
      timeWindow: "1 minute",
    });
    await fastify.register(import("@fastify/cors"), { origin: "*" });

    await fastify.register(import("@fastify/swagger"), {
      swagger: {
        info: {
          title: "template REST API service",
          // description: 'Testing the Fastify swagger API',
          version: "0.1.0-dev",
        },
        securityDefinitions: {
          apiKey: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
      },
    });

    await fastify.register(import("@fastify/swagger-ui"), {
      routePrefix: "/docs",
    });
    await fastify.register(import("./plugins/user") as never, {
      prefix: "/user",
    });

    await fastify.listen({ port: 4000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
