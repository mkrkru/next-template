import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
    nickname: String,
    password_hash: String
}));
