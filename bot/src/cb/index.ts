import { Context } from 'telegraf';
import * as cmds from './cmds';
import { User } from '../models';

export default async function cbHandler(ctx: Context & any) {
    const { data, from } = ctx.update.callback_query;
    const [cmd, payload, ...rest] = data.split('_');

    ctx.user = await User.findById(from.id);

    if (cmds[cmd as keyof typeof cmds]) await cmds[cmd as keyof typeof cmds](ctx, payload, ...rest);
}