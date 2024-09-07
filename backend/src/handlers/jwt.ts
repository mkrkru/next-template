import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../';
import { User } from '../models';

export default async function jwtHandler(req: any, res: any) {
    try {
        const { nickname } = jwt.verify(req.headers.authorization, jwt_secret) as JwtPayload;
        const user = await User.findOne({ nickname });
        if (!user) return res.code(404).send({ message: 'user not found' });
        req.user = user;
    } catch (err) {
        res.code(500).send(err);
    }
}
