import mongoose from 'mongoose';
import './ws';
const fastify = require('fastify')({ logger: true });

mongoose.connect(`mongodb://${process.env.NODE_ENV === 'production' ? 'mongo' : '127.0.0.1'}/template`);
mongoose.connection.on('connected', () => console.log('[✅DB] Cluster connected!'));

fastify.get('/', () => ({ message: 'OK' }));

export const jwt_secret = process.env?.JWT_SECRET ?? 'tempsecret';

(async () => {
    try {
        await fastify.register(require('@fastify/rate-limit'), { max: 100, timeWindow: '1 minute' });
        await fastify.register(require('@fastify/cors'), { origin: '*' });

        await fastify.register(require('@fastify/swagger'), {
            swagger: {
                info: {
                    title: 'template DD REST API service',
                    // description: 'Testing the Fastify swagger API',
                    version: '0.1.0-dev'
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
        console.log('template dd api launched...');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();
