import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../';
import { IUser, User } from '../../models';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function jwtHttpHandler(req: FastifyRequest, res: FastifyReply) {
    try {
        const { _id } = jwt.verify(req.headers.authorization ?? '', jwt_secret) as JwtPayload;
        const user = await User.findById(_id);
        if (!user) return res.code(404).send({ message: 'user not found' });
        req.user = user;
    } catch (err) {
        res.code(500).send(err);
    }
}

export async function jwtWsHandler(token: string = ''): Promise<IUser | null> {
    try {
        const { _id } = jwt.verify(token, jwt_secret) as JwtPayload;
        return await User.findById(_id);
    } catch {
        return null;
    }
}
