import './ws';
import { logger } from '../misc';

const fastify = require('fastify')({ logger });

fastify.post('/', () => ({ message: 'OK' }));
fastify.get('/', () => ({ message: 'OK' }));

export const jwt_secret = process.env?.JWT_SECRET ?? 'tempsecret';

(async () => {
    try {
        await fastify.register(require('@fastify/rate-limit'), { max: 100, timeWindow: '1 minute' });
        await fastify.register(require('@fastify/cors'), { origin: '*' });

        await fastify.register(require('@fastify/swagger'), {
            swagger: {
                info: {
                    title: 'template REST API service',
                    // description: 'Testing the Fastify swagger API',
                    version: require('../../package.json').version
                },
                securityDefinitions: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header'
                    }
                }
            }
        });

        await fastify.register(require('@fastify/swagger-ui'), { routePrefix: '/docs' });
        await fastify.register(require('./plugins/test'), { prefix: '/test' });

        await fastify.listen({ port: 4000, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();
