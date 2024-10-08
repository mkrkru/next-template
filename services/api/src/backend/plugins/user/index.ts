import { FastifyInstance } from 'fastify';
import { jwtHttpHandler } from '../../handlers/jwt';
import { IRequest } from '../../../types';

export default async function (fastify: FastifyInstance) {
    await fastify.register(import('../../handlers/auth') as never, { prefix: '/auth' });

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
        handler: (req: IRequest) => {
            return req.user.toJSON();
        }
    });
}
