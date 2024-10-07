import { FastifyInstance } from 'fastify';
import { jwtHttpHandler } from '../../handlers/jwt';

export default async function userRouter(fastify: FastifyInstance) {
    await fastify.register(import('../../handlers/auth'), { prefix: '/auth' });

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
        } as never),
        preHandler: jwtHttpHandler,
        handler: (req) => req.user.toJSON()
    });
}
