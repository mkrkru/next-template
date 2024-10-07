import * as cmds from './cmds';
import { User } from '../../models';
import { MyContext } from '../index';

export default async function cbHandler(ctx: MyContext) {
    if (!('callback_query' in ctx.update) || !('data' in ctx.update.callback_query)) return;

    const { data, from } = ctx.update.callback_query;
    const [cmd, payload, ...rest] = data.split('_');

    ctx.user = await User.findById(from.id) as never;

    if (cmds[cmd as keyof typeof cmds]) await cmds[cmd as keyof typeof cmds](ctx, payload, ...rest);
}