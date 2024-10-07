import { FastifyRequest as raw } from 'fastify';
import { IUser } from './src/models';

declare module 'fastify' {
    export interface FastifyRequest extends raw {
        user: IUser;
    }
}
