import { DoneFuncWithErrOrRes, FastifyInstance } from 'fastify';

export default function testRouter(fastify: FastifyInstance, { service_id }: any, done: DoneFuncWithErrOrRes) {
    fastify.register(require('../../handlers/auth'), { prefix: '/auth', service_id });

    fastify.get(
        '/',
        {
            schema: {
                tags: ['user'],
                security: [
                    {
                        'apiKey': []
                    }
                ]
            }
        } as any,
        () => ({ message: 'OK' })
    );

    done();
}
