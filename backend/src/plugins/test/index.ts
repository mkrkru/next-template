import { DoneFuncWithErrOrRes, FastifyInstance } from 'fastify';
import { jwtHttpHandler } from '../../handlers/jwt';

export default function testRouter(fastify: FastifyInstance, { service_id }: any, done: DoneFuncWithErrOrRes) {
    fastify.register(require('../../handlers/auth'), { prefix: '/auth', service_id });

    fastify.route({
        method: 'get',
        url: '/',
        schema: ({
            tags: ['user'],
            security: [
                {
                    'apiKey': []
                }
            ]
        } as any),
        preHandler: jwtHttpHandler,
        handler: () => ({ message: 'OK' })
    });

    done();
}
