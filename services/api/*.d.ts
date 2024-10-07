import { FastifyRequest as raw } from 'fastify';

declare module 'fastify' {
    export interface FastifyRequest extends raw {
        // eslint-disable-next-line
        user: any;
    }
}
