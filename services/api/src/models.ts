import { document, getModel, required } from 'typeodm.io';
import { Types } from 'mongoose';

@document()
export class IUser {
    _id!: Types.ObjectId;

    @required()
    nickname!: string;

    @required()
    password_hash!: string;
}

export const User = getModel<IUser>(IUser);
