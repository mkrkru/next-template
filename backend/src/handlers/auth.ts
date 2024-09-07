import { DoneFuncWithErrOrRes, FastifyInstance } from 'fastify';
import { ISignupBody } from '../types';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../';
import { expiresIn } from '../misc';
import { User } from '../models';

export default function authHandler(fastify: FastifyInstance, opts: any, done: DoneFuncWithErrOrRes) {
    fastify.post(
        '/signup',
        {
            schema: {
                tags: ['auth']
            }
        } as any,
        async (req: any, res: any) => {
            const { nickname, password }: ISignupBody = req.body;

            let user = await User.findOne({ nickname }, []);
            if (user) return res.code(403).send({ message: 'nickname already exists' });

            const password_hash = await bcrypt.hash(password, 10);
            user = await User.create({ nickname, password_hash });

            res.code(201).send({ access_token: jwt.sign({ nickname }, jwt_secret, { expiresIn }) });
        }
    );

    fastify.post(
        '/signin',
        {
            schema: {
                tags: ['auth']
            }
        } as any,
        async (req: any, res: any) => {
            const { nickname, password }: ISignupBody = req.body;
            const message = 'invalid nickname or password';

            const user = await User.findOne({ nickname });
            if (!user || !user.nickname || !user.password_hash) return res.code(404).send({ message });

            const valid_hash = await bcrypt.compare(password, user.password_hash.toString());
            if (!valid_hash) return res.code(403).send({ message });

            res.code(200).send({ access_token: jwt.sign({ nickname: user.nickname.toString() }, jwt_secret, { expiresIn }) });
        }
    );

    done();
}
