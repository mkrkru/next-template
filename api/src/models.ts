import { document, getModel, required } from 'typeodm.io';

@document()
export class IUser {
    @required()
    username!: string;

    @required()
    password_hash!: string;
}

export const User = getModel<IUser>(IUser);
